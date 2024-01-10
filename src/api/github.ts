import request from '@/utils/request';

export const getAccount = () => request.get<Github.Account>('/api/account');

export const getTeams = () => request.get<Github.Team[]>('/api/team/');

export const getTeamInfo = (team_id: string) => request.get<Github.Team[]>(`/api/team/${team_id}`);

export const getTeamMember = (team_id: string) =>
  request.get<Github.TeamMember[]>(`/api/team/${team_id}/member`);

export const bindTeamMember = (
  team_id: string,
  data: {
    code_user_id: string;
    im_user_id: string;
  },
) => request.put(`/api/team/${team_id}/member`, data);

export const getPlatformMember = <T>(team_id: string, platform: string) =>
  request.get<T>(`/api/team/${team_id}/${platform}/user`);

export const installApp = (team_id: string, platform: string, data: unknown) =>
  request.post(`/api/team/${team_id}/${platform}/app`, data);
