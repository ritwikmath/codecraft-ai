/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAPI } from './useAPI';
import { useCallback } from 'react';

interface SessionState {
  [key: string]: any;
}

interface UseSessionResult {
  // fetchSessionDetails: (userId: string, sessionId: string) => Promise<void>;
  fetchSessions: (userId: string) => Promise<void>;
  createSession: (userId: string, sessionId: string, state: SessionState) => Promise<void>;
  loading: boolean;
  error: string | null;
  response: any;
}

export function useSession(): UseSessionResult {
  const { loading, error, response, callAPI } = useAPI();

  const fetchSessions = useCallback(
    async (userId: string) => {
      await callAPI({
        method: 'GET',
        url: `http://localhost:8000/apps/git_agent/users/${userId}/sessions`,
        headers: {
          'Content-Type': 'application/json',
        }
      });
    },
    [callAPI]
  )

  // const fetchSessionDetails = useCallback(
  //   async (userId: string, sessionId: string) => {
  //     await callAPI({
  //       method: 'GET',
  //       url: `http://localhost:8000/apps/git_agent/users/${userId}/sessions/${sessionId}`,
  //       headers: {
  //         'Content-Type': 'application/json',
  //       }
  //     });
  //   },
  //   [callAPI]
  // )

  const createSession = useCallback(
    async (userId: string, sessionId: string, state: SessionState) => {
      await callAPI({
        method: 'POST',
        url: `http://localhost:8000/apps/git_agent/users/${userId}/sessions/${sessionId}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: { state },
      });
    },
    [callAPI]
  );

  return { fetchSessions, createSession, loading, error, response };
} 