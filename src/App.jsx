import { Route, Routes } from 'react-router-dom';
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

//JIRA 테스트용 주석

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<MainPage />} />

        <Route path="/create-hw" element={<HomeworkCreatePage />} />
        <Route path="/create-project" element={<ProjectCreatePage />} />
        <Route path="/create-study" element={<StudyCreatePage />} />

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
    </Routes>
  );
}

export default App;
