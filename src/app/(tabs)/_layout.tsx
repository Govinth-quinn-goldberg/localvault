import { Tabs } from "expo-router";
export default function TabLayout() {
    return (
        <Tabs screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#101116",
                    borderTopColor: "#292A32",
                    height: 65,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: "#FF304F",
                tabBarInactiveTintColor: "#888888",
            }}
        >
            <Tabs.Screen name="notes"options={{title: "Notes",}}/>
            <Tabs.Screen name="passwords" options={{title: "Passwords",}}/>
        </Tabs>
    );
}