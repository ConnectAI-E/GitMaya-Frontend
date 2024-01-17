import { create } from 'zustand';
import { createSelectors } from './helper';
import { getTeamInfo } from '@/api';

interface TeamInfoState {
  teamInfo: Github.TeamInfo | null;
  setTeam: (teamInfo: Github.TeamInfo) => void;

  updateTeamInfo: (team_id: string) => Promise<void>;
}

const useTeamInfoStoreBase = create<TeamInfoState>((set) => ({
  teamInfo: null,
  setTeam: (teamInfo) => set({ teamInfo }),
  updateTeamInfo: async (team_id: string) => {
    const { data } = await getTeamInfo(team_id);
    set({ teamInfo: data });
  },
}));

export const useTeamInfoStore = createSelectors(useTeamInfoStoreBase);
