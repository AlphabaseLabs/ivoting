import { useAppProvider } from "../Hooks/useAppProvider";
import {
  startVoting,
  stopVoting,
  getSystemStatus,
  triggerTally,
} from "./voterServices";

export const handleVotingStart = async (account) => {
  try {
    let res: any = await startVoting(account);
    if (res) {
      getStatus();
    }
    return res;
  } catch (error: Error) {
    throw new Error(error.message);
  }
};

export const handleVotingStop = async (account) => {
  try {
    let res: any = await stopVoting(account);
    if (res) {
      getStatus();
    }
    return res;
  } catch (error: Error) {
    throw new Error(error.message);
  }
};

const getStatus = async () => {
  try {
    let systemState: any = await getSystemStatus();

    return systemState;
  } catch (error) {
    console.log("Error in get status", error);
    throw new Error(`Error in get status ${error}`);
  }
};

export const handleTallyingStart = async () => {
  console.log("handleTallyingStart");

  try {
    let res: any = triggerTally();
    return res;
  } catch (error: Error) {
    throw new Error(error.message);
  }
};
