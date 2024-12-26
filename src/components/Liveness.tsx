import { useEffect, useState } from "react";
import { Loader, Heading } from "@aws-amplify/ui-react";
import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness";
import { LivenessError } from "@aws-amplify/ui-react-liveness/dist/types/components/FaceLivenessDetector/service/types/liveness";
import { authService } from "../services/api";

export function LivenessQuickStart() {
  const [loading, setLoading] = useState<boolean>(true);
  const [sessionId, setSessionId] = useState<{
    sessionId: string;
  } | null>(null);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCreateLiveness = async () => {
      const response = await authService.getSessionId();
      setSessionId({ sessionId: response.sessionId });
      setLoading(false);
    };

    fetchCreateLiveness();
  }, []);

  const handleAnalysisComplete = async () => {
    if (!sessionId?.sessionId) return;

    const result = await authService.verifyLiveness(sessionId.sessionId);
    if (result.verified) {
      setSuccess("User is live");
      console.log("live");
    } else {
      setSuccess("User is not live");
      console.log("not live");
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