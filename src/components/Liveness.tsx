import { useEffect, useState } from "react";
import { Loader, Heading } from "@aws-amplify/ui-react";
import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness";
import { authService } from "../services/api";

type LivenessError = {
  // Using type instead of interface
  message?: string;
  code?: string;
  name?: string;
  [key: string]: any; // Allow any additional properties
};

export function LivenessQuickStart() {
  const [loading, setLoading] = useState<boolean>(true);
  const [sessionId, setSessionId] = useState<{
    sessionId: string;
  } | null>(null);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCreateLiveness = async () => {
      try {
        const response = await authService.getSessionId();
        setSessionId({ sessionId: response.sessionId });
      } catch (error) {
        console.error('Error fetching session:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreateLiveness();
  }, []);

  const handleAnalysisComplete = async () => {
    if (!sessionId?.sessionId) return;

    try {
      const result = await authService.verifyLiveness(sessionId.sessionId);
      if (result.verified) {
        setSuccess("User is live");
        console.log("live");
      } else {
        setSuccess("User is not live");
        console.log("not live");
      }
    } catch (error) {
      console.error('Error verifying liveness:', error);
      setSuccess("Verification failed");
    }
  };

  const handleError = (livenessError: LivenessError) => {
    console.log("got error", livenessError);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <FaceLivenessDetector
            sessionId={sessionId?.sessionId ?? "1"}
            region="us-east-1"
            onAnalysisComplete={handleAnalysisComplete}
            onError={handleError}
          />
          <Heading level={2}>{success}</Heading>
        </>
      )}
    </>
  );
}
