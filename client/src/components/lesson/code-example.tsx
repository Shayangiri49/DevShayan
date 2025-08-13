import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CodeExampleProps {
  code: string;
  language?: string;
  onCopy?: (code: string) => void;
}

export default function CodeExample({ code, language = "python", onCopy }: CodeExampleProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (onCopy) {
      onCopy(code);
    } else {
      navigator.clipboard.writeText(code);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting for Python
  const highlightPython = (code: string) => {
    return code
      .replace(/\b(def|class|if|else|elif|for|while|import|from|return|print|len|range|int|str|float|bool|True|False|None)\b/g, '<span class="text-blue-400">$1</span>')
      .replace(/(#.*$)/gm, '<span class="text-gray-500">$1</span>')
      .replace(/(['"])(.*?)\1/g, '<span class="text-green-400">$1$2$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="text-yellow-400">$1</span>');
  };

  return (
    <Card className="bg-gray-900 border-gray-700">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
        <span className="text-gray-300 text-sm font-medium">Example</span>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="text-gray-400 hover:text-white">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </Button>
      </div>
      <CardContent className="p-4">
        <pre className="text-gray-300 text-sm overflow-x-auto">
          <code 
            dangerouslySetInnerHTML={{ 
              __html: language === 'python' ? highlightPython(code) : code 
            }}
          />
        </pre>
      </CardContent>
    </Card>
  );
}
