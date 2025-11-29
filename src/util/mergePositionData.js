export function mergePositionData(original, updated) {
  const synced = original
    .filter((a) => updated.some((b) => b.position === a.position.name))
    .map((a) => {
      const match = updated.find((b) => b.position === a.position.name);
      return {
        position: a.position.name,
        participantInfo: {
          maxParticipants: match.maxParticipants,
          currParticipants: a.participantInfo.currParticipants,
        },
      };
    });

  const additions = updated
    .filter((b) => !original.some((a) => a.position.name === b.position))
    .map((b) => ({
      position: b.position,
      participantInfo: {
        maxParticipants: b.maxParticipants,
        currParticipants: 0,
      },
    }));

  return [...synced, ...additions];
}
