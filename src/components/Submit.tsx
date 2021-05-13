import { ReactNode } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

type Props = {
  color: string;
  icon: ReactNode;
  disabled: boolean;
  children: ReactNode;  
};

export default function Submit({
  color,
  icon,
  disabled,
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
        type='submit'
        variant='contained'
        size='large'
        className={ useStyles().button }
        startIcon={ icon }
        disabled = { disabled }
      >
        {children}
      </Button>
    </div>
  );
}
