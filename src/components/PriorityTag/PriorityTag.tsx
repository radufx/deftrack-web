import { tv } from 'tailwind-variants';

const tagStyle = tv({
  base: 'flex rounded-full text-center px-2 uppercase text-[14px] w-[74px] justify-center text-gray-400',
  variants: {
    intent: {
      high: 'bg-[#ffad99]',
      low: 'bg-[#99ff99]',
      medium: 'bg-[#ffff99]',
    },
  },
});

const getTagText = (priority: string) => {
  if (priority == 'low') return '';
};

const PriorityTag = ({ priority }: { priority: 'unset' | 'low' | 'medium' | 'high' }) => {
  if (priority === 'unset') return null;

  return <div className={tagStyle({ intent: priority })}>{priority}</div>;
};

export default PriorityTag;
