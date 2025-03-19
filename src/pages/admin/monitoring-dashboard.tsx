import { useEffect, useState } from 'react';
import { ExamSession, Exam } from '../../lib/types';

interface LiveStats {
  totalActive: number;
  averageProgress: number;
  recentActions: ExamSession['activityLog'];
}

export function MonitoringDashboard() {
  const [activeSessions, setActiveSessions] = useState<ExamSession[]>([]);
  const [stats, setStats] = useState<LiveStats>({
    totalActive: 0,
    averageProgress: 0,
    recentActions: [],
  });

  useEffect(() => {
    // Load active sessions from localStorage for demo
    const sessions = JSON.parse(localStorage.getItem('activeSessions') || '[]');
    setActiveSessions(sessions);

    // Set up real-time updates (simulated)
    const interval = setInterval(() => {
      updateStats();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const updateStats = () => {
    // In a real app, this would be websocket/server-sent events
    const sessions = JSON.parse(localStorage.getItem('activeSessions') || '[]');
    const totalActive = sessions.length;
    
    const progress = sessions.reduce((acc: number, session: ExamSession) => {
      const answered = session.answers.length;
      const exam = JSON.parse(localStorage.getItem(`exam-${session.examId}`) || '{}') as Exam;
      return acc + (answered / exam.totalQuestions) * 100;
    }, 0);

    const averageProgress = totalActive ? progress / totalActive : 0;
    
    const recentActions = sessions
      .flatMap((s: ExamSession) => s.activityLog)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);

    setStats({
      totalActive,
      averageProgress,
      recentActions,
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Live Monitoring Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Active Students</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalActive}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Average Progress</h3>
          <p className="text-3xl font-bold text-green-600">
            {stats.averageProgress.toFixed(1)}%
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Potential Issues</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {activeSessions.filter(s => 
              s.activityLog.some(log => log.action === 'tab_switch')
            ).length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Active Sessions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exam
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Remaining
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {activeSessions.map((session) => {
                const exam = JSON.parse(
                  localStorage.getItem(`exam-${session.examId}`) || '{}'
                ) as Exam;
                const progress = (session.answers.length / exam.totalQuestions) * 100;
                
                return (
                  <tr key={session.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {session.userId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {exam.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs mt-1">{progress.toFixed(1)}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {/* Calculate remaining time */}
                      {(() => {
                        const start = new Date(session.startTime).getTime();
                        const now = Date.now();
                        const elapsed = Math.floor((now - start) / 1000 / 60);
                        const remaining = exam.duration - elapsed;
                        return `${remaining} min`;
                      })()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        session.activityLog.some(log => log.action === 'tab_switch')
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {session.activityLog.some(log => log.action === 'tab_switch')
                          ? 'Warning'
                          : 'Active'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {stats.recentActions.map((action, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`w-2 h-2 mt-2 rounded-full ${
                action.action === 'answer' ? 'bg-green-500' :
                action.action === 'tab_switch' ? 'bg-yellow-500' :
                'bg-blue-500'
              }`} />
              <div>
                <p className="text-sm text-gray-600">
                  {action.action === 'answer' ? 'Question Answered' :
                   action.action === 'tab_switch' ? 'Tab Switch Detected' :
                   action.action}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(action.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 