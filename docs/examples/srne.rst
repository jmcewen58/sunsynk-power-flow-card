##############
SRNE HEPB and Sungold Power SGS series inverters. Though according to documentation, may cover most SRNE inverters.
##############

************************************************************************************
Example 1 Using https://github.com/timbit123/srne-modbus on separate pi or container, which pushes data to HA via MQTT.  USB 1 (USB-B to USB-A) directly to pi. The 
included wifi dongle only pushes data to their cloud and allows for remote support, it can't be used for local polling or push.  Note can't use the wifi dongle at 
the same time, as srne only accepts a single RS-485 connection and both use the same internal RS-485 bus. BMS RS485 connector is separate bus, but only works as BMS input.
************************************************************************************

.. code-block:: yaml
  :linenos:

  type: custom:sunsynk-power-flow-card
  cardstyle: compact
  show_solar: true
  show_battery: true
  show_grid: true
  inverter:
    model: srne
  battery:
    invert_flow: false
    invert_power: false
  solar:
    show_daily: true
    mppts: 1
  load:
    show_daily: false
  grid:
    show_daily_buy: true
    show_daily_sell: true
    invert_grid: true
    invert_flow: false
    auto_scale: true
  entities:
    load_frequency_192: sensor.srne1_grid_frequency
    inverter_status_59: sensor.srne1_inverter_state
    battery_voltage_183: sensor.srne1_battery_voltage
    battery_power_190: sensor.srne1_battery_power
    battery_current_191: sensor.srne1_battery_current
    grid_power_169: sensor.srne_grid_output_power
    pv1_power_186: sensor.srne1_pv_total_power
    day_pv_energy_108: sensor.srne1_daily_pv_power_generated
    battery_soc_184: sensor.srne1_battery_soc
    nonessential_power: sensor.srne1_home_load_total_power
    essential_power: sensor.srne1_load_total_power
    inverter_voltage_154: sensor.srne1_inverter_voltage_a
    inverter_voltage_L2: sensor.srne1_inverter_voltage_b
    inverter_current_164: sensor.srne1_inverter_current_a
    inverter_current_L2: sensor.srne1_inverter_current_b
    grid_ct_power_172: sensor.srne1_ct_total_power
    inverter_power_175: sensor.srne_grid_output_power
    pv1_voltage_109: sensor.srne1_pv1_voltage
    pv1_current_110: sensor.srne1_pv1_current
    day_battery_charge_70: sensor.srne1_daily_grid_battery_charging_kwh
    day_battery_discharge_71: sensor.srne1_daily_battery_discharged_kwh
    prog1_time: text.srne1_charge_start_time_1
    prog2_time: text.srne1_charge_end_time_1
    prog3_time: text.srne1_charge_start_time_2
    prog4_time: text.srne1_discharge_start_time_1
    prog5_time: text.srne1_discharge_end_time_1
    prog1_capacity: number.srne1_timed_charge_1_max_power
    prog2_capacity: number.srne1_timed_charge_3_max_power
    prog3_capacity: number.srne1_timed_charge_2_max_power
    prog4_capacity: number.srne1_timed_discharge_1_max_power
    prog1_charge: number.srne1_timed_charge_1_soc_limit
    prog2_charge: number.srne1_timed_charge_1_soc_limit
    prog3_charge: number.srne1_timed_charge_2_soc_limit
    prog4_charge: number.srne1_timed_discharge_1_soc_limit


************************************************************************************
Example configuration.yaml entries for utility_meter to extract daily grid buy and sell values from totals.  (note that you'll need to adjust tabbing - delete two spaces from each line))
************************************************************************************

.. code-block:: yaml
  :linenos:



.. note::



