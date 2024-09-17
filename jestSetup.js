import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-gesture-handler', () => {
  return {
    GestureHandlerRootView: jest.fn().mockImplementation(({ children }) => children),
    Directions: {},
    ScrollView: jest.fn(),
    Slider: jest.fn(),
    Switch: jest.fn(),
    TextInput: jest.fn(),
    ToolbarAndroid: jest.fn(),
    ViewPagerAndroid: jest.fn(),
    DrawerLayoutAndroid: jest.fn(),
    WebView: jest.fn(),
    NativeViewGestureHandler: jest.fn(),
    TapGestureHandler: jest.fn(),
    FlingGestureHandler: jest.fn(),
    ForceTouchGestureHandler: jest.fn(),
    LongPressGestureHandler: jest.fn(),
    PanGestureHandler: jest.fn(),
    PinchGestureHandler: jest.fn(),
    RotationGestureHandler: jest.fn(),
  };
});
