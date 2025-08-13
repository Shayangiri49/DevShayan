import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Play, Trash2, Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { usePythonExecutor } from "@/hooks/use-python-executor";
import BottomNav from "@/components/navigation/bottom-nav";

export default function CodeEditor() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { executeCode, isLoading } = usePythonExecutor();
  
  const [code, setCode] = useState(`# Write your Python code here
print('Hello, World!')
`);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const runCode = async () => {
    if (!code.trim()) {
      toast({
        title: "No code to run",
        description: "Please write some Python code first.",
        variant: "destructive",
      });
      return;
    }

    setIsRunning(true);
    try {
      const result = await executeCode(code);
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  const clearOutput = () => {
    setOutput("");
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied!",
      description: "Code copied to clipboard",
    });
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'python_code.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Code saved as python_code.py",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <Button variant="ghost" size="sm" onClick={() => setLocation("/")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="font-semibold text-foreground">Python Playground</h2>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={copyCode}>
            <Copy className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={downloadCode}>
            <Download className="w-4 h-4" />
          </Button>
          <Button 
            size="sm" 
            onClick={runCode} 
            disabled={isRunning || isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            <Play className="w-4 h-4 mr-1" />
            {isRunning ? "Running..." : "Run"}
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex flex-col h-[calc(100vh-140px)]">
        {/* Code Input */}
        <div className="flex-1 bg-gray-900">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="# Write your Python code here
print('Hello, World!')"
            className="w-full h-full bg-transparent text-gray-300 p-4 resize-none border-0 focus-visible:ring-0 font-mono text-sm"
            style={{ 
              backgroundColor: 'rgb(17 24 39)',
              color: 'rgb(209 213 219)',
            }}
          />
        </div>

        {/* Output Console */}
        <Card className="h-32 rounded-none border-t border-border">
          <div className="flex items-center justify-between px-4 py-2 border-b border-border">
            <span className="text-muted-foreground text-sm font-medium">Output</span>
            <Button variant="ghost" size="sm" onClick={clearOutput}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <CardContent className="p-4 h-24 overflow-y-auto">
            <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
              {output || (isRunning ? "Running code..." : "Output will appear here")}
            </pre>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
