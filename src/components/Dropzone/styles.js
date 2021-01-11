import { makeStyles } from '@material-ui/core/styles';
import { getColor } from '../../utils/differentFunc';

const useStyles = makeStyles({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignIems: 'center',
    padding: 20,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: (props) => getColor(props),
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
  },
});

export default useStyles;
