import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SigninPage from './pages/SigninPage/SigninPage';
import SignupPage from './pages/SignupPage';
import MainPage from './pages/main/MainPage';
import MainLayout from './layout/MainLayout';
import HomeworkCreatePage from './pages/job-create/HomeworkCreatePage';
import ProjectCreatePage from './pages/job-create/ProjectCreatePage';
import StudyCreatePage from './pages/job-create/StudyCreatePage';
import HomeworkDetailPage from './pages/job-detail/HomeworkDetailPage';
import ProjectDetailPage from './pages/job-detail/ProjectDetailPage';
import StudyDetailPage from './pages/job-detail/StudyDetailPage';
import HomeworkListPage from './pages/job-list/HomeworkListPage';
import ProjectListPage from './pages/job-list/ProjectListPage';
import StudyListPage from './pages/job-list/StudyListPage';
import ProfilePage from './pages/my-page/profile/ProfilePage';
import PasswordEditPage from './pages/my-page/profile/PasswordEditPage';
import MyApplicationsPage from './pages/my-page/MyApplicationsPage';
import MyPostedJobsPage from './pages/my-page/MyPostedJobsPage';
import MyTeamPage from './pages/my-page/MyTeamPage';
import SavedJobPage from './pages/my-page/SavedJobsPage';
import NotificationPage from './pages/notification/NotificationPage';
import SearchResult from './pages/search-result/SearchResultPage';
import { Navigate } from 'react-router-dom';
import PublicRoute from './routes/PublicRoute';
import ProtectedRoute from './routes/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';
import axios from 'axios';
import { useEffect } from 'react';
import useAuthStore from './stores/useAuthStore';

function App() {
  const { setAccessToken, logout, accessToken, isLoading, setLoading } = useAuthStore();
  const apiKey = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();
  const location = useLocation();

  //새로고침 시 refresh 요청
  useEffect(() => {
    if (location.pathname === '/signin' || location.pathname === '/signup') return;
    async function postRefresh() {
      try {
        const res = await axios.post(
          `${apiKey}/api/v1/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const authHeader = res.headers.authorization;
        const newToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

        setAccessToken(newToken);
      } catch (e) {
        if (e.response?.status === 401) logout();
      } finally {
        setLoading(false); // 로딩 종료
      }
    }

    postRefresh();
  }, [setAccessToken, logout, setLoading]);

  // 토큰 없으면 로그인 페이지로 이동
  useEffect(() => {
    if (!isLoading && !accessToken) {
      navigate('/signin', { replace: true });
    }
  }, [accessToken, isLoading, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />

      <Route
        path="/signin"
        element={
          <PublicRoute>
            <SigninPage />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        }
      />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<MainPage />} />

        <Route path="/create-hw" element={<HomeworkCreatePage />} />
        <Route path="/create-project" element={<ProjectCreatePage />} />
        <Route path="/create-study" element={<StudyCreatePage />} />

        <Route path="/edit-hw/:id" element={<HomeworkCreatePage />} />
        <Route path="/edit-project/:id" element={<ProjectCreatePage />} />
        <Route path="/edit-study/:id" element={<StudyCreatePage />} />

        <Route path="/hw-list" element={<HomeworkListPage />} />
        <Route path="/project-list" element={<ProjectListPage />} />
        <Route path="/study-list" element={<StudyListPage />} />

        <Route path="/hw-list/:id" element={<HomeworkDetailPage />} />
        <Route path="/project-list/:id" element={<ProjectDetailPage />} />
        <Route path="/study-list/:id" element={<StudyDetailPage />} />

        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/search-result" element={<SearchResult />} />

        <Route path="/my-page">
          <Route path="profile" element={<ProfilePage />} />
          <Route path="profile/editpw" element={<PasswordEditPage />} />
          <Route path="my-applications" element={<MyApplicationsPage />} />
          <Route path="my-posted-job" element={<MyPostedJobsPage />} />
          <Route path="my-team" element={<MyTeamPage />} />
          <Route path="saved-job" element={<SavedJobPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
