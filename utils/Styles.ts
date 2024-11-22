import {StyleSheet} from 'react-native';
import {Colors} from '@/constants/Colors';

export const Styles = StyleSheet.create({
  animatedView: {
    overflow: 'hidden',
    width: '100%',
  },
  input: {
    alignSelf: 'center',
    borderRadius: 10,
    color: Colors.light,
    flex: 1,
    fontSize: 14,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  rowAround: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 4,
  },
  rowBetween: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowBottom: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowCenter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-start',
    padding: 4,
  },
  rowRight: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-end',
    padding: 4,
  },
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    position: 'absolute',
    width: '100%',
  },
});
