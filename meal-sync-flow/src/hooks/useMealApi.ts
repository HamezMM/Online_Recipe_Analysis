import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useMealApi = (webhookUrl: string) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const analyzeRecipe = async (url: string) => {
    if (!webhookUrl) {
      toast({
        title: "Configuration required",
        description: "Please configure your n8n webhook URL first.",
        variant: "destructive",
      });
      return null;
    }

    setLoading(true);
    try {
      console.log("Sending request to:", webhookUrl);
      console.log("Payload:", { url });
      
      const formData = new FormData();
      formData.append("url", url);

      const response = await fetch(webhookUrl, {
        method: "POST",
        body: formData,
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }

      // Clone the response to read it multiple times if needed
      const responseClone = response.clone();
      let responseText = "";
      
      try {
        responseText = await response.text();
        console.log("Response text length:", responseText.length);
        console.log("Response text:", responseText);
      } catch (error) {
        console.error("Error reading response text:", error);
        throw new Error("Failed to read response from webhook. This might be a CORS issue.");
      }

      if (!responseText || responseText.trim() === "") {
        console.error("Empty response received");
        throw new Error("Empty response received from webhook. Check your n8n 'Respond to Webhook' node configuration.");
      }

      let data;
      try {
        data = JSON.parse(responseText);
        console.log("Parsed response:", data);
      } catch (error) {
        console.error("JSON parse error:", error);
        console.error("Failed to parse:", responseText);
        throw new Error("Invalid JSON received from webhook");
      }
      
      // Handle array response - extract first element
      const result = Array.isArray(data) ? data[0] : data;
      console.log("Final result:", result);
      
      if (!result || !result.ingredientList) {
        throw new Error("Response missing ingredientList field");
      }
      
      return result;
    } catch (error) {
      console.error("Error analyzing recipe:", error);
      
      let errorMessage = "Failed to analyze recipe. ";
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        errorMessage += "This is likely a CORS issue. Make sure your n8n workflow has CORS enabled for this domain.";
      } else if (error instanceof Error) {
        errorMessage += error.message;
      } else {
        errorMessage += "Please check your webhook configuration.";
      }
      
      toast({
        title: "Analysis failed",
        description: errorMessage,
        variant: "destructive",
        duration: 6000,
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { analyzeRecipe, loading };
};
