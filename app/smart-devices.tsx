import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Colors } from '../constants/Colors';

interface SmartDevice {
  id: string;
  name: string;
  type: 'fitness_tracker' | 'smart_watch' | 'smart_scale' | 'heart_monitor' | 'sleep_tracker' | 'other';
  brand: string;
  model: string;
  connected: boolean;
  lastSync: string;
  batteryLevel?: number;
  dataTypes: string[];
}

const SmartDevicesScreen: React.FC = () => {
  const [devices, setDevices] = useState<SmartDevice[]>([
    {
      id: '1',
      name: 'Apple Watch Series 9',
      type: 'smart_watch',
      brand: 'Apple',
      model: 'Series 9',
      connected: true,
      lastSync: '2024-01-15T10:30:00Z',
      batteryLevel: 85,
      dataTypes: ['Heart Rate', 'Steps', 'Sleep', 'Workouts', 'Calories']
    },
    {
      id: '2',
      name: 'Fitbit Charge 5',
      type: 'fitness_tracker',
      brand: 'Fitbit',
      model: 'Charge 5',
      connected: false,
      lastSync: '2024-01-10T08:15:00Z',
      batteryLevel: 45,
      dataTypes: ['Steps', 'Heart Rate', 'Sleep', 'Stress']
    }
  ]);

  const [availableDevices] = useState([
    { name: 'Apple Watch', type: 'smart_watch', icon: 'watch' },
    { name: 'Fitbit', type: 'fitness_tracker', icon: 'fitness' },
    { name: 'Garmin', type: 'fitness_tracker', icon: 'location' },
    { name: 'Samsung Galaxy Watch', type: 'smart_watch', icon: 'watch' },
    { name: 'Withings Scale', type: 'smart_scale', icon: 'scale' },
    { name: 'Polar Heart Monitor', type: 'heart_monitor', icon: 'heart' },
    { name: 'Oura Ring', type: 'sleep_tracker', icon: 'moon' },
    { name: 'Google Pixel Watch', type: 'smart_watch', icon: 'watch' },
  ]);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'smart_watch': return 'watch';
      case 'fitness_tracker': return 'fitness';
      case 'smart_scale': return 'scale-outline';
      case 'heart_monitor': return 'heart';
      case 'sleep_tracker': return 'moon';
      default: return 'hardware-chip';
    }
  };

  const formatLastSync = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    } else if (diffMinutes < 1440) {
      return `${Math.floor(diffMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffMinutes / 1440)} days ago`;
    }
  };

  const toggleDeviceConnection = (deviceId: string) => {
    setDevices(devices.map(device => 
      device.id === deviceId 
        ? { ...device, connected: !device.connected, lastSync: device.connected ? device.lastSync : new Date().toISOString() }
        : device
    ));
  };

  const removeDevice = (deviceId: string) => {
    Alert.alert(
      'Remove Device',
      'Are you sure you want to remove this device?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => setDevices(devices.filter(d => d.id !== deviceId))
        }
      ]
    );
  };

  const addDevice = (deviceType: any) => {
    Alert.alert(
      'Add Device',
      `Would you like to connect your ${deviceType.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Connect',
          onPress: () => {
            // Simulate device connection
            const newDevice: SmartDevice = {
              id: Date.now().toString(),
              name: deviceType.name,
              type: deviceType.type,
              brand: deviceType.name.split(' ')[0],
              model: 'Unknown',
              connected: true,
              lastSync: new Date().toISOString(),
              dataTypes: ['Steps', 'Heart Rate']
            };
            setDevices([...devices, newDevice]);
            Alert.alert('Success', `${deviceType.name} connected successfully!`);
          }
        }
      ]
    );
  };

  const syncDevice = (deviceId: string) => {
    setDevices(devices.map(device => 
      device.id === deviceId 
        ? { ...device, lastSync: new Date().toISOString() }
        : device
    ));
    Alert.alert('Sync Complete', 'Device data has been synchronized.');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.gray[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Smart Devices</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {/* Connected Devices */}
        <Card>
          <Text style={styles.sectionTitle}>Connected Devices</Text>
          
          {devices.map((device) => (
            <View key={device.id} style={styles.deviceCard}>
              <View style={styles.deviceHeader}>
                <View style={styles.deviceInfo}>
                  <View style={[styles.deviceIcon, { backgroundColor: device.connected ? Colors.green[100] : Colors.gray[100] }]}>
                    <Ionicons 
                      name={getDeviceIcon(device.type)} 
                      size={24} 
                      color={device.connected ? Colors.green[600] : Colors.gray[500]} 
                    />
                  </View>
                  <View style={styles.deviceDetails}>
                    <Text style={styles.deviceName}>{device.name}</Text>
                    <Text style={styles.deviceBrand}>{device.brand} • {device.model}</Text>
                    <Text style={[styles.deviceStatus, { color: device.connected ? Colors.green[600] : Colors.gray[500] }]}>
                      {device.connected ? 'Connected' : 'Disconnected'}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.deviceActions}>
                  {device.batteryLevel && (
                    <View style={styles.batteryIndicator}>
                      <Ionicons name="battery-half" size={16} color={Colors.gray[500]} />
                      <Text style={styles.batteryText}>{device.batteryLevel}%</Text>
                    </View>
                  )}
                  <Switch
                    value={device.connected}
                    onValueChange={() => toggleDeviceConnection(device.id)}
                    trackColor={{ false: Colors.gray[300], true: Colors.green[200] }}
                    thumbColor={device.connected ? Colors.green[500] : Colors.gray[500]}
                  />
                </View>
              </View>
              
              {device.connected && (
                <View style={styles.deviceFooter}>
                  <Text style={styles.lastSync}>Last sync: {formatLastSync(device.lastSync)}</Text>
                  <View style={styles.deviceButtons}>
                    <TouchableOpacity 
                      style={styles.syncButton} 
                      onPress={() => syncDevice(device.id)}
                    >
                      <Ionicons name="refresh" size={16} color={Colors.primary[500]} />
                      <Text style={styles.syncButtonText}>Sync</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.removeButton} 
                      onPress={() => removeDevice(device.id)}
                    >
                      <Ionicons name="trash-outline" size={16} color={Colors.red[500]} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              
              {device.connected && (
                <View style={styles.dataTypes}>
                  <Text style={styles.dataTypesLabel}>Data Types:</Text>
                  <View style={styles.dataTypesContainer}>
                    {device.dataTypes.map((type, index) => (
                      <View key={index} style={styles.dataTypeTag}>
                        <Text style={styles.dataTypeText}>{type}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          ))}
          
          {devices.length === 0 && (
            <Text style={styles.emptyText}>No devices connected</Text>
          )}
        </Card>

        {/* Available Devices */}
        <Card>
          <Text style={styles.sectionTitle}>Add New Device</Text>
          <Text style={styles.sectionSubtitle}>Connect popular fitness and health devices</Text>
          
          <View style={styles.availableDevicesGrid}>
            {availableDevices.map((device, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.availableDevice}
                onPress={() => addDevice(device)}
              >
                <Ionicons name={device.icon as any} size={32} color={Colors.primary[500]} />
                <Text style={styles.availableDeviceName}>{device.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Data Permissions */}
        <Card>
          <Text style={styles.sectionTitle}>Data Permissions</Text>
          <Text style={styles.sectionSubtitle}>Control what data your devices can access</Text>
          
          <View style={styles.permissionItem}>
            <Text style={styles.permissionTitle}>Health Data Sharing</Text>
            <Switch
              value={true}
              trackColor={{ false: Colors.gray[300], true: Colors.primary[200] }}
              thumbColor={Colors.primary[500]}
            />
          </View>
          
          <View style={styles.permissionItem}>
            <Text style={styles.permissionTitle}>Location Access</Text>
            <Switch
              value={false}
              trackColor={{ false: Colors.gray[300], true: Colors.primary[200] }}
              thumbColor={Colors.gray[500]}
            />
          </View>
          
          <View style={styles.permissionItem}>
            <Text style={styles.permissionTitle}>Background Sync</Text>
            <Switch
              value={true}
              trackColor={{ false: Colors.gray[300], true: Colors.primary[200] }}
              thumbColor={Colors.primary[500]}
            />
          </View>
        </Card>

        <Button onPress={() => router.back()} style={styles.doneButton}>
          Done
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[50],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 60,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.gray[800],
  },
  placeholder: {
    width: 40,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray[800],
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.gray[600],
    marginBottom: 16,
  },
  deviceCard: {
    backgroundColor: Colors.gray[50],
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  deviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  deviceDetails: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gray[800],
    marginBottom: 2,
  },
  deviceBrand: {
    fontSize: 14,
    color: Colors.gray[600],
    marginBottom: 2,
  },
  deviceStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  deviceActions: {
    alignItems: 'center',
  },
  batteryIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  batteryText: {
    fontSize: 12,
    color: Colors.gray[500],
    marginLeft: 4,
  },
  deviceFooter: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastSync: {
    fontSize: 12,
    color: Colors.gray[500],
  },
  deviceButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  syncButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: Colors.primary[50],
  },
  syncButtonText: {
    fontSize: 12,
    color: Colors.primary[500],
    marginLeft: 4,
  },
  removeButton: {
    padding: 4,
  },
  dataTypes: {
    marginTop: 12,
  },
  dataTypesLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.gray[700],
    marginBottom: 8,
  },
  dataTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  dataTypeTag: {
    backgroundColor: Colors.primary[50],
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dataTypeText: {
    fontSize: 12,
    color: Colors.primary[600],
  },
  availableDevicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  availableDevice: {
    width: '48%',
    backgroundColor: Colors.gray[50],
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  availableDeviceName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.gray[700],
    marginTop: 8,
    textAlign: 'center',
  },
  permissionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  permissionTitle: {
    fontSize: 16,
    color: Colors.gray[700],
  },
  emptyText: {
    fontSize: 14,
    color: Colors.gray[500],
    textAlign: 'center',
    fontStyle: 'italic',
    paddingVertical: 20,
  },
  doneButton: {
    marginTop: 24,
  },
});

export default SmartDevicesScreen;