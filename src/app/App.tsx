import { useLayoutEffect, useRef, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { C } from "@/constants/colors";
import { getProjectBySlug } from "@/data/portfolioTiles";
import { ContactPage } from "@/pages/ContactPage";
import { HomePage } from "@/pages/HomePage";
import { ProjectDetailPage } from "@/pages/ProjectDetailPage";
import { StudioPage } from "@/pages/StudioPage";
import { WorkPage } from "@/pages/WorkPage";
import { pageFromPathname, paths } from "@/routing/paths";

function ProjectRoute() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return <Navigate to={paths.work} replace />;
  }

  return <ProjectDetailPage project={project} />;
}

function AppShell() {
  const location = useLocation();
  const [opacity, setOpacity] = useState(1);
  const prevPath = useRef(location.pathname);

  useLayoutEffect(() => {
    if (prevPath.current !== location.pathname) {
      setOpacity(0);
      const timer = window.setTimeout(() => {
        window.scrollTo(0, 0);
        setOpacity(1);
        prevPath.current = location.pathname;
      }, 180);
      return () => window.clearTimeout(timer);
    }
  }, [location.pathname]);

  const currentPage = pageFromPathname(location.pathname);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0; background: var(--merino); color: var(--cedar); }
        button { background: none; border: none; padding: 0; cursor: pointer; }
        input, textarea, select { font-family: inherit; }
        ::-webkit-scrollbar { width: 0px; }
        ::selection { background: var(--oyster); color: var(--cedar); }
        @keyframes lbFadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      <Header current={currentPage} />

      <main
        style={{
          opacity,
          transition: "opacity 0.3s ease",
          minHeight: "100vh",
          background: C.merino,
        }}
      >
        <Routes location={location}>
          <Route path={paths.home} element={<HomePage />} />
          <Route path={paths.studio} element={<StudioPage />} />
          <Route path={paths.work} element={<WorkPage />} />
          <Route path={paths.contact} element={<ContactPage />} />
          <Route path="/work/:slug" element={<ProjectRoute />} />
          <Route path="*" element={<Navigate to={paths.home} replace />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
