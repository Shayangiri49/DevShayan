import { useState, useEffect } from "react";

declare global {
  interface Window {
    pyodide: any;
  }
}

export function usePythonExecutor() {
  const [isLoading, setIsLoading] = useState(true);
  const [pyodide, setPyodide] = useState<any>(null);

  useEffect(() => {
    const loadPyodide = async () => {
      try {
        // Load Pyodide
        if (!window.pyodide) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
          script.onload = async () => {
            const pyodideInstance = await (window as any).loadPyodide({
              indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
            });
            window.pyodide = pyodideInstance;
            setPyodide(pyodideInstance);
            setIsLoading(false);
          };
          document.head.appendChild(script);
        } else {
          setPyodide(window.pyodide);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to load Pyodide:', error);
        setIsLoading(false);
      }
    };

    loadPyodide();
  }, []);

  const executeCode = async (code: string): Promise<string> => {
    if (!pyodide) {
      throw new Error('Python environment not ready');
    }

    try {
      // Capture stdout
      pyodide.runPython(`
import sys
import io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
      `);

      // Execute user code
      pyodide.runPython(code);

      // Get output
      const stdout = pyodide.runPython('sys.stdout.getvalue()');
      const stderr = pyodide.runPython('sys.stderr.getvalue()');

      // Reset stdout/stderr
      pyodide.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
      `);

      if (stderr) {
        throw new Error(stderr);
      }

      return stdout || 'Code executed successfully (no output)';
    } catch (error) {
      // Reset stdout/stderr on error
      pyodide.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
      `);
      throw error;
    }
  };

  return { executeCode, isLoading };
}
