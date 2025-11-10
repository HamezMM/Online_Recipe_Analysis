import { useState } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface WebhookConfigProps {
  webhookUrl: string;
  onWebhookUrlChange: (url: string) => void;
}

export const WebhookConfig = ({ webhookUrl, onWebhookUrlChange }: WebhookConfigProps) => {
  const [tempUrl, setTempUrl] = useState(webhookUrl);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    onWebhookUrlChange(tempUrl);
    setOpen(false);
    toast({
      title: "Webhook URL saved",
      description: "Your n8n webhook URL has been updated.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configure n8n Webhook</DialogTitle>
          <DialogDescription>
            Enter your n8n webhook URL to enable meal data queries.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input
              id="webhook-url"
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
              placeholder="https://your-n8n-instance.com/webhook/..."
            />
          </div>
          <Button onClick={handleSave} className="w-full">
            Save Configuration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
