import { MouseEventHandler, ReactNode } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

type Props = {
  color: string;
  icon: ReactNode;
  handleClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

export default function CustomButton({
  color,
  icon,
  handleClick,
  children,
}: Props) {
  const useStyles = makeStyles(() => ({
    button: {
      width: '120px',
      borderRadius: '8px',
      backgroundColor: color,
      color: 'white',
    },
  }));

  return (
    <div>
      <Button
        variant='contained'
        size='large'
        className={useStyles().button}
        startIcon={icon}
        onClick={handleClick}
      >
        {children}
      </Button>
    </div>
  );
}
