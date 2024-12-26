import { LivenessQuickStart } from "./Liveness";
import { Button, View } from "@aws-amplify/ui-react";

const Dashboard = () => {
  return (
    <View width="600px" margin="0 auto">
      <LivenessQuickStart />
      <Button onClick={() => localStorage.removeItem('token')} variation="warning">
        Sign Out
      </Button>
    </View>
  );
};

export default Dashboard;