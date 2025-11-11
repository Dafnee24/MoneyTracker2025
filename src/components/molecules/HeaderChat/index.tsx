import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {LogoChatHeader, MenuHamburger} from '../../../assets';

type Props = {
  onPressMenu?: () => void;
  onPressAction?: () => void;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
};

const HeaderChat: React.FC<Props> = ({
  onPressMenu,
  onPressAction,
  leftSlot,
  rightSlot,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={onPressMenu}>
        {leftSlot ?? <MenuHamburger width={24} height={24} />}
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={onPressAction}>
        {rightSlot ?? <LogoChatHeader width={26} height={26} />}
      </TouchableOpacity>
    </View>
  );
};

export default HeaderChat;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
});
