import * as constant from "helper/constant";

const colors = [
  { value: constant.Status.PENDING, label: 'Pending', color: 'magenta', icon: '⏳' },
  { value: constant.Status.COMPLETED, label: 'Completed', color: 'green', icon: '✅' },
];


const tagColor = (status) => {
  const element = colors.find((obj) => obj?.value == status);
  if (element) return element;
  else return { value: status, label: status };
};

export { tagColor };
