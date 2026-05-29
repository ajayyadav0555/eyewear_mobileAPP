import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text,fontSize:0 } }
      }>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={'house'}
          md={'home'}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={'heart'}
          md={'favorite'} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="home2">
        <NativeTabs.Trigger.Label>Home2</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={'gearshape.arrow.triangle.2.circlepath'} md={'settings'}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
