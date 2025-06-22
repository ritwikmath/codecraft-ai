/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAPI } from './useAPI';
import { useCallback } from 'react';

interface SessionState {
  [key: string]: any;
}

interface UseSessionResult {
  create: any
  fetchAll: any
  fetchOne: any
}

export function useSession(): UseSessionResult {
  // const { loading, error, response, callAPI } = useAPI();
  const createAPI = useAPI();
  const createCallApi = createAPI.callAPI;

  const fetchAllAPI = useAPI();
  const fetchAllCallApi = fetchAllAPI.callAPI

  const fetchOneAPI = useAPI();
  const fetchOneCallAPI = fetchOneAPI.callAPI



  const fetchSessions = useCallback(
    async (userId: string) => {
      await fetchAllCallApi({
        method: 'GET',
        url: `http://localhost:8000/apps/git_agent/users/${userId}/sessions`,
        headers: {
          'Content-Type': 'application/json',
        }
      });
    },
    [fetchAllCallApi]
  )

  const fetchSessionDetails = useCallback(
    async (userId: string, sessionId: string) => {
      await fetchOneCallAPI({
        method: 'GET',
        url: `http://localhost:8000/apps/git_agent/users/${userId}/sessions/${sessionId}`,
        headers: {
          'Content-Type': 'application/json',
        }
      });
    },
    [fetchOneCallAPI]
  )

  const createSession = useCallback(
    async (userId: string, sessionId: string, state: SessionState) => {
      await createCallApi({
        method: 'POST',
        url: `http://localhost:8000/apps/git_agent/users/${userId}/sessions/${sessionId}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: state,
      });
    },
    [createCallApi]
  );

  return {
    create: {
      ...createAPI,
      createSession
    },
    fetchAll: {
      ...fetchAllAPI,
      fetchSessions
    },
    fetchOne: {
      ...fetchOneAPI,
      fetchSessionDetails
    }
  };
} 