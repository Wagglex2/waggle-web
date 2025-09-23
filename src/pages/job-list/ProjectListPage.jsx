/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ProjectCard from "@/components/card/ProjectCard";

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

const dummyProjects = [
  {
    id: 1,
    purposeTag: "공모전",
    methodTag: "온/오프라인",
    deadline: "2025.12.15까지",
    title: "웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.",
    positions: ["기획", "디자인", "프론트엔드", "백엔드", "PM", "으뱌뱌", "흠냐냐"],
    techStack: ["TypeScript", "React", "Figma"],
    author: "솔랑솔랑",
  },
  {
    id: 2,
    purposeTag: "사이드프로젝트",
    methodTag: "오프라인",
    deadline: "2025.12.15까지",
    title: "웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.",
    positions: ["기획", "디자인", "프론트엔드", "백엔드"],
    techStack: ["TypeScript", "React", "Figma"],
    author: "솔랑솔랑",
  },
  {
    id: 3,
    purposeTag: "해커톤",
    methodTag: "온라인",
    deadline: "2025.12.15까지",
    title: "웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.",
    positions: ["기획", "디자인", "프론트엔드", "백엔드"],
    techStack: ["TypeScript", "React", "Figma"],
    author: "솔랑솔랑",
  },
  {
    id: 4,
    purposeTag: "토이프로젝트",
    methodTag: "온라인",
    deadline: "2025.12.15까지",
    title: "웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.",
    positions: ["기획", "디자인", "프론트엔드", "백엔드"],
    techStack: ["TypeScript", "React", "Figma"],
    author: "솔랑솔랑",
  },
  {
    id: 5,
    purposeTag: "공모전",
    methodTag: "온/오프라인",
    deadline: "2025.12.15까지",
    title: "웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.",
    positions: ["기획", "디자인", "프론트엔드", "백엔드"],
    techStack: ["TypeScript", "React", "Figma"],
    author: "솔랑솔랑",
  },
  {
    id: 6,
    purposeTag: "사이드프로젝트",
    methodTag: "오프라인",
    deadline: "2025.12.15까지",
    title: "웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.",
    positions: ["기획", "디자인", "프론트엔드", "백엔드"],
    techStack: ["TypeScript", "React", "Figma"],
    author: "솔랑솔랑",
  },
];

export default function ProjectListPage() {
  return (
    <div css={gridStyle}>
      {dummyProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}