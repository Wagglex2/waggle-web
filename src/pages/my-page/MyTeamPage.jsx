import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';

const colors = {
  border: '#eee6d6',
  text: '#3a3a3a',
  muted: '#8f8678',
  btnBg: '#fff',
  btnHover: '#fcfbf8',
  tabActive: '#FEF1B2',
  primary: '#FFCC00'
};

const Wrap = styled.div`
  padding: 24px 32px;
  color: ${colors.text};
  font-family: "Pretendard","Noto Sans KR",sans-serif;
`;

const Title = styled.h2`
  margin: 0 0 24px;
  display: flex; align-items: center; gap: 8px;
`;

const Tabs = styled.div`
  display: flex; gap: 8px; margin: 0 0 16px;
`;

const TabButton = styled.button`
  width: 90px;
  height: 33px;
  border-radius: 10px;
  border: 1px solid ${colors.border};
  background: ${p => (p['data-active'] ? colors.tabActive : '#fff')};
  cursor: pointer;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TeamCard = styled.section`
  background: #fff;
  border: 1px solid ${colors.border};
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  overflow: hidden;
  margin-bottom: 16px;
`;

const TeamHeader = styled.button`
  width: 100%;
  text-align: left;
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: #fff;
  border: 0;
  border-bottom: 1px solid ${colors.border};
  cursor: pointer;
`;

const TeamMeta = styled.div`
  display: flex; align-items: center; gap: 8px;
  color: ${colors.muted}; font-size: 12px;
  margin-top: 6px;
`;

const Badge = styled.span`
  display: inline-block;
  min-width: 50px;
  text-align: center;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid ${p => (p.status === '종료' ? '#B3B3B3' : '#B3B3B3')};
  background: ${p => (p.status === '종료' ? '#FFDFDF' : '#CFE6C1')};
  color: ${p => (p.status === '종료' ? '#666666' : '#666666')};
`;

const Count = styled.span`
  color: ${colors.muted};
  font-size: 14px;
`;

const Caret = styled.span`
  width: 22px; height: 22px; border-radius: 50%;
  border: 1px solid ${colors.border};
  display: inline-flex; align-items: center; justify-content: center;
  transform: rotate(${p => (p.open ? 180 : 0)}deg);
  transition: transform .15s ease;
`;

const MemberRow = styled.div`
  display: grid;
  grid-template-columns: ${p => (p.isProject ? '56px 1fr 100px 150px auto' : '56px 1fr 100px auto')};
  align-items: center;
  gap: 8px;
  padding: 16px 20px;
  border-bottom: 1px solid ${colors.border};
  &:last-of-type { border-bottom: 0; }
`;

const Dot = styled.div`
  width: 40px; height: 40px; border-radius: 50%;
  background: ${p => p.color || '#e5e5e5'};
`;

const Sub = styled.small`color: ${colors.muted};`;

const PositionSub = styled(Sub)`
  text-align: center;
`;

const Actions = styled.div`
  display: flex; gap: 8px; justify-self: end;
`;

const Btn = styled.button`
  height: 32px; padding: 0 12px; border-radius: 999px;
  border: 1px solid ${colors.border}; background: ${colors.btnBg};
  cursor: pointer; font-family: inherit;
  &:hover { background: ${colors.btnHover}; }
`;

const ReviewBtn = styled(Btn)`
  background: #FEF1B2;
  border-color: #F2E6A2;
  &:hover { background: #F9E89A; }
`;

const Empty = styled.div`
  border: 1px dashed ${colors.border};
  border-radius: 12px;
  padding: 24px;
  color: ${colors.muted};
  text-align: center;
`;

/* Modal */
const Overlay = styled.div`
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  width: 410px;
  height: 600px;
  max-width: calc(100% - 32px);
  background: #fff; border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  padding: 30px 30px 40px;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 8px;
  border-bottom: 1px solid ${colors.border};
`;

const ModalTitle = styled.h3`
  margin: 0; font-size: 22px; color: #103C1F; text-align: center;
`;

const CloseBtn = styled.button`
  position: absolute; right: 0; top: 50%; transform: translateY(-50%);
  width: 36px; height: 36px;
  border: 0; background: transparent; cursor: pointer;
  font-size: 20px;
  color: ${colors.muted};
`;

const ProfileRow = styled.div`
  display: flex; align-items: center; gap: 12px;
  padding: 16px 0 12px;
`;

const Avatar = styled.div`
  width: 44px; height: 44px; border-radius: 50%;
  background: #ffe7e7; display: flex; align-items: center; justify-content: center;
  font-size: 22px;
`;

const Label = styled.label`
  display: block; font-weight: 600; margin: 8px 0 6px;
`;

const TextAreaBox = styled.div`
  border: 1px solid ${colors.border};
  border-radius: 12px; overflow: hidden; background: #fff;
`;

const TextArea = styled.textarea`
  width: 100%; min-height: 300px; max-height: 350px;
  resize: vertical; overflow: auto;
  border: 0; outline: none; padding: 14px;
  font-family: inherit; color: ${colors.text};
  &::placeholder { color: #b5b0a8; }
`;

const Helper = styled.div`
  display: flex; justify-content: flex-end; color: ${colors.muted};
  font-size: 12px; padding-top: 6px;
`;

const Notes = styled.ul`
  margin: 14px 0 24px;
  padding-left: 18px; color: ${colors.muted};
  font-size: 12px; line-height: 1.6;
`;

const SaveBar = styled.div`
  margin-top: auto;
  display: flex; justify-content: center;
`;

const SaveBtn = styled.button`
  min-width: 200px; height: 48px; border-radius: 12px;
  border: 0; background: ${colors.primary}; color: #173300;
  font-weight: 700; cursor: pointer;
`;

const sampleTeams = [
  {
    id: 't1',
    category: '프로젝트',
    title: '웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.',
    status: '종료',
    period: '2025.06.07 ~ 2025.08.16 | 2달',
    members: [
      { id: 'm1', name: '솔랑솔랑', grade: '리더', position: '프론트엔드', color: '#f5c24b' },
      { id: 'm2', name: '팔랑팔랑', grade: '멤버', position: '백엔드', color: '#c9a7ff' },
      { id: 'm3', name: '팔랑귀', grade: '멤버', position: 'PM', color: '#8ee7f2' },
      { id: 'm4', name: '팔보채', grade: '멤버', position: '디자인', color: '#ffa3b8' }
    ]
  },
  {
    id: 't2',
    category: '프로젝트',
    title: '웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다222.',
    status: '진행중',
    period: '2025.06.07 ~ 진행 중 | 진행 중',
    members: [
      { id: 'm5', name: '짱구', grade: '리더', position: '백엔드', color: '#ffd482' }
    ]
  },
  {
    id: 't3',
    category: '과제',
    title: '운영체제 과제 같이 하실 분 구합니다.',
    status: '진행중',
    period: '2025.09.01 ~ 진행 중',
    members: [
      { id: 'm6', name: '유리', grade: '리더', color: '#ffb3c7' }
    ]
  },
  {
    id: 't4',
    category: '스터디',
    title: '코테 스터디 같이 하실 분 구합니다.',
    status: '종료',
    period: '2025.04.01 ~ 2025.06.30',
    members: [
      { id: 'm7', name: '철수', grade: '리더', color: '#b3e5ff' }
    ]
  }
];

// --- 현재 로그인한 사용자를 시뮬레이션하는 변수 ---
const currentUserId = 'm1';

const MyTeamPage = () => {
  const [tab, setTab] = useState('프로젝트');
  const [teams, setTeams] = useState(sampleTeams);
  const [open, setOpen] = useState(() => new Set());
  const [reviewTarget, setReviewTarget] = useState(null);
  const [reviewText, setReviewText] = useState('');

  const toggle = id => {
    setOpen(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleDeleteMember = (teamId, memberId) => {
    if (!window.confirm("정말 팀에서 삭제하시겠습니까?")) return;

    setTeams(currentTeams =>
      currentTeams.map(team => {
        if (team.id === teamId) {
          const updatedMembers = team.members.filter(member => member.id !== memberId);
          return { ...team, members: updatedMembers };
        }
        return team;
      })
    );
  };

  const filtered = useMemo(() => teams.filter(t => t.category === tab), [teams, tab]);
  const chars = reviewText.length;
  const maxChars = 200;

  const openReview = (team, member) => {
    setReviewTarget({ team, member });
    setReviewText('');
  };
  const closeReview = () => setReviewTarget(null);
  const saveReview = () => {
    alert(`리뷰 저장: ${reviewTarget?.member.name}\n${reviewText}`);
    setReviewTarget(null);
  };

  return (
    <Wrap>
      <Title>🧑‍🤝‍🧑 내 팀 관리</Title>

      <Tabs>
        <TabButton data-active={tab === '프로젝트'} onClick={() => setTab('프로젝트')}>프로젝트</TabButton>
        <TabButton data-active={tab === '과제'} onClick={() => setTab('과제')}>과제</TabButton>
        <TabButton data-active={tab === '스터디'} onClick={() => setTab('스터디')}>스터디</TabButton>
      </Tabs>

      {filtered.length === 0 && <Empty>해당 카테고리의 팀이 없어요.</Empty>}

      {filtered.map(team => {
        const isOpen = open.has(team.id);
        const leaderName = team.members.find(m => m.grade === '리더')?.name || '리더';
        const isProject = team.category === '프로젝트';
        
        const currentUserIsLeader = team.members.some(m => m.grade === '리더' && m.id === currentUserId);

        return (
          <TeamCard key={team.id}>
            <TeamHeader onClick={() => toggle(team.id)} aria-expanded={isOpen}>
              <div>
                <div style={{fontWeight: 700, fontSize: '18px'}}>{team.title}</div>
                <TeamMeta>
                  <span>{leaderName}</span>
                  <Badge status={team.status}>{team.status}</Badge>
                  <span>{team.period}</span>
                </TeamMeta>
              </div>
              <Count>{team.members.length}명</Count>
              <Caret open={isOpen}>⌄</Caret>
            </TeamHeader>

            {isOpen && team.members.map(member => (
              <MemberRow key={member.id} isProject={isProject}>
                <Dot color={member.color} />
                <div>
                  <div style={{fontWeight: 600, fontSize: '15px'}}>{member.name}</div>
                </div>
                <Sub>{member.grade}</Sub>
                {isProject && <PositionSub>{member.position}</PositionSub>}
                <Actions>
                  <Btn
                    onClick={(e) => {
                      if (!currentUserIsLeader) return;
                      e.stopPropagation();
                      handleDeleteMember(team.id, member.id);
                    }}
                    style={{ visibility: currentUserIsLeader ? 'visible' : 'hidden' }}
                  >
                    삭제하기
                  </Btn>
                  <ReviewBtn onClick={(e) => { e.stopPropagation(); openReview(team, member); }}>리뷰쓰기</ReviewBtn>
                </Actions>
              </MemberRow>
            ))}
          </TeamCard>
        );
      })}

      {reviewTarget && (
        <Overlay onClick={closeReview} role="dialog" aria-modal="true">
          <Modal onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>리뷰쓰기</ModalTitle>
              <CloseBtn onClick={closeReview} aria-label="닫기">✕</CloseBtn>
            </ModalHeader>

            <ProfileRow>
              <Avatar>🐣</Avatar>
              <div style={{fontWeight: 600}}>{reviewTarget.member.name}</div>
            </ProfileRow>

            <Label htmlFor="review-detail">상세</Label>
            <TextAreaBox>
              <TextArea
                id="review-detail"
                maxLength={maxChars}
                placeholder={`${reviewTarget.member.name}님에 대한 솔직한 피드백을 남겨주세요.`}
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
              />
            </TextAreaBox>
            <Helper>{chars} / {maxChars}</Helper>

            <Notes>
              <li>작성한 피드백은 닉네임, 프로필 이미지와 함께 누구나 볼 수 있도록 공개됩니다. 피드백 내용에 민감한 개인정보가 포함되지 않도록 주의하시기 바랍니다.</li>
              <li>솔직하게 작성하신 피드백은 다른 분들께 큰 도움이 됩니다. 하지만 허위 사실이나 명예훼손, 욕설, 타인비방글 등 제 3자의 권리를 침해하는 리뷰는 서비스 이용약관이나 관련 법률에 따라 제재를 받을 수 있습니다.
              </li>
            </Notes>

            <SaveBar>
              <SaveBtn onClick={saveReview}>저장하기</SaveBtn>
            </SaveBar>
          </Modal>
        </Overlay>
      )}
    </Wrap>
  );
};

export default MyTeamPage;

