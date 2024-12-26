interface Window {
    FaceLivenessDetector: {
      init: (config: {
        sessionId: string;
        containerId: string;
        onComplete: () => void;
        onError: (error: any) => void;
      }) => void;
    };
  }

  // src/types/global.d.ts
  // 
  interface Window {
    HyperKYC: {
      init: (config: {
        sessionId: string;
        containerId: string;
        onComplete: () => void;
        onError: (error: any) => void;
      }) => void;
    };
  }