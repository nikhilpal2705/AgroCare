const colors = [
  { value: 'default', label: 'default', icon: '🌟' },
  { value: 'cancelled', label: 'cancelled', color: 'volcano', icon: '❌' },
  { value: 'success', label: 'success', color: 'green', icon: '✨' },
  { value: 'failed', label: 'failed', color: 'red', icon: '❌' },
  { value: 'error', label: 'error', color: 'volcano', icon: '⚠️' },
  { value: 'delayed', label: 'delayed', color: 'orange', icon: '⏰' },
  { value: 'completed', label: 'completed', color: 'green', icon: '✅' },
];

const statusTagColorList = (tags = []) => {
  const list = [];

  tags.map((x) => {
    const element = colors.find((obj) => obj?.value?.toLowerCase() === x?.toLowerCase());
    if (element) list.push(element);
    else list.push({ value: x, label: x });
  });
  return list;
};

const tagColor = (status) => {
  const element = colors.find((obj) => obj?.value?.toLowerCase() === status?.toLowerCase());
  if (element) return element;
  else return { value: status, label: status };
};

export { statusTagColorList, tagColor };
