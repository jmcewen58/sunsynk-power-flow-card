// grid-elements.ts
import { svg, html } from 'lit';
import { localize } from '../../../localize/localize';
import { Utils } from '../../../helpers/utils';
import { CardStyle, DataDto, sunsynkPowerFlowCardConfig } from '../../../types';
import { icons } from '../../../helpers/icons';
import {
	UnitOfPower,
	validGridConnected,
	validGridDisconnected,
} from '../../../const';
import { createTextWithPopup, renderText } from '../../../helpers/text-utils';
import { renderPath } from '../../../helpers/render-path';
import { renderCircle } from '../../../helpers/render-circle';
import { renderLoad } from '../../../helpers/render-load';

const renderGridIcons = (data: DataDto, config: sunsynkPowerFlowCardConfig) => {
	const { gridColour, totalGridPower } = data;

	const isGridConnected = validGridConnected.includes(
		data.gridStatus.toLowerCase(),
	);
	const isGridDisconnected = validGridDisconnected.includes(
		data.gridStatus.toLowerCase(),
	);
	const showGrid = config.show_grid;
											
									

	return svg`
        <svg id="transmission_on" x="-0.5" y="187.5" width="64.5" height="64.5" viewBox="0 0 24 24">
            <path class="${isGridDisconnected ? 'st12' : ''}"
                fill="${gridColour}"
                display="${!showGrid || totalGridPower < 0 || config.grid.import_icon ? 'none' : ''}"
                d="${icons.gridOn}"/>
        </svg>
        <svg id="transmission_off" x="-0.5" y="187.5" width="64.5" height="64.5" viewBox="0 0 24 24">
            <path class="${isGridConnected ? 'st12' : ''}"
                fill="${data.gridOffColour}" display="${!showGrid || config.grid.disconnected_icon ? 'none' : ''}"
                d="${icons.gridOff}"/>
        </svg>
        <svg id="grid_export" x="-0.5" y="187.5" width="64.5" height="64.5" viewBox="0 0 24 24">
            <path class="${isGridDisconnected ? 'st12' : ''}"
                fill="${gridColour}"
                display="${!showGrid || totalGridPower >= 0 || config.grid.export_icon ? 'none' : ''}"
                d="${icons.gridExportCompact}"/>
        </svg>
    `;
};

const formatPowerValue = (
	//	data: DataDto,
	//	config: sunsynkPowerFlowCardConfig,
	auto_scale: boolean,
	show_absolute: boolean,
	decimalPlaces: number,
	totalGridPower: number,
) => {
	if (auto_scale) {
		const convertedValue = Utils.convertValue(totalGridPower, decimalPlaces);
		return show_absolute
			? Utils.convertValue(Math.abs(totalGridPower), decimalPlaces) || '0'
			: convertedValue || '0';
	} else {
		return show_absolute ? Math.abs(totalGridPower) : totalGridPower || 0;
	}
};

const renderGridTotalPower = (
	data: DataDto,
	config: sunsynkPowerFlowCardConfig,
	largeGridBox: boolean,
) => {
											
	const auto_scale = config.grid.auto_scale;
	const show_absolute = config.grid.show_absolute;
	const decimalPlaces = data.decimalPlaces;
	const largeFont = data.largeFont;
	const gridColour = data.gridColour;
	const flowGridColour = data.flowGridColour;
								 

				  
																		   
							
																	   
						   
		 
																			  
  

	return svg`
		<svg x="103" y="183.5" width="71" height="71">
		    <rect width="71" height="71" fill="none"/>
			<rect
				width="70"
				height="${largeGridBox ? '70' : '30'}"
				y="${largeGridBox ? '1' : '20'}"
				rx="4.5"
				ry="4.5"
				fill="none"
				stroke="${gridColour}"
				pointer-events="all"
				display="${!config.show_grid ? 'none' : ''}"
			/>
			<text id="grid_total_power" x="35" y="35"
				display="${!config.show_grid || config.entities.grid_ct_power_172 === 'none' ? 'none' : ''}"
				class="${largeFont !== true ? 'st14' : 'st4'} st8" fill="${gridColour}"
				text-anchor="middle" dominant-baseline="central" 
				transform="${largeGridBox ? 'rotate(-90,25,45.5)' : ''}">
				${formatPowerValue(auto_scale, show_absolute, decimalPlaces, data.totalGridPower)} ${!auto_scale ? UnitOfPower.WATT : ''}
			</text>
		</svg>
		<svg display="${largeGridBox ? '' : 'none'}" x="103" y="183.5" width="70" height="71">
			<rect width="71" height="71" fill="none"/>
			<text id="inverter_grid_total_power" x="35" y="35"
				display="${!config.show_grid || config.entities.grid_power_169 === 'none' ? 'none' : ''}"
				class="${largeFont !== true ? 'st14' : 'st4'} st8" fill="${flowGridColour}"
				text-anchor="middle" dominant-baseline="central" transform="rotate(-90,45,25.5)">
				${formatPowerValue(auto_scale, show_absolute, decimalPlaces, data.autoScaledGridPower)} ${!auto_scale ? UnitOfPower.WATT : ''}
			</text>
		</svg>
    `;
};

export const renderGridElements = (
	data: DataDto,
	config: sunsynkPowerFlowCardConfig,
) => {
	const {
		showNonessential,
		decimalPlaces,
		gridColour,
		largeFont,
		totalGridPower,
		isDischarging,
		flowGridColour,
		flowNonEssColour,
		hasGtPV,
	} = data;

	const largeGridBox: boolean = showNonessential || hasGtPV;

	const isLiteCard = config.cardstyle === CardStyle.Lite;

    const xNeLoad = 
        config.battery.show_daily
            ? 5
            : config.cardstyle === CardStyle.Lite
                ? 77.5
                : 102.5

    const { dynamic_colour } = config.load;

	const { auto_scale, invert_flow } = config.grid;

	const { three_phase } = config.inverter;

	const gridFlowKeyPoints = isDischarging ? '1;0' : '0;1';
															 
					  
		  
		   

	const grid1FlowKeyPoints = invert_flow
		? Utils.invertKeyPoints(totalGridPower < 0 ? '0;1' : '1;0')
		: totalGridPower < 0
			? '0;1'
			: '1;0';

	return html`
		<!-- Grid Elements -->
		<svg
			id="Grid"
			style="overflow: visible; display: ${!config.show_grid
				? 'none'
				: 'inline'};"
		>
		
		   
			 
			  
			   
			
			
			   
						  
						
												
	 
			${renderText(
				'daily_grid_buy',
				5,
				282.1,
				!config.show_grid,
				'st3 left-align',
				data.gridShowDailyBuy !== true ? 'transparent' : gridColour,
				config.grid.label_daily_grid_buy || localize('common.daily_grid_buy'),
				true,
			)}
			${renderText(
				'daily_grid_sell',
				5,
				179,
				!config.show_grid,
				'st3 left-align',
				data.gridShowDailySell !== true ? 'transparent' : gridColour,
				config.grid.label_daily_grid_sell || localize('common.daily_grid_sell'),
				true,
			)}
			${renderText(
				'grid_name',
				5,
				config.grid.show_daily_buy ? '294' : '267',
				!config.show_grid,
				'st3 st8 left-align',
				gridColour,
				config.grid.grid_name || localize('common.grid_name'),
				true,
			)}
			<svg id="grid-flow">
				${renderPath(
					'grid-line',
					config.wide ? 'M 173 218 L 287 218' : 'M 173 218 L 214 218',
					config.show_grid,
					flowGridColour,
					data.gridLineWidth,
				)}
				${renderCircle(
					'grid-dot',
					Math.min(
						2 + data.gridLineWidth + Math.max(data.minLineWidth - 2, 0),
						8,
					),
					data.autoScaledGridPower === 0 ? 'transparent' : flowGridColour,
					data.durationCur['grid'],
					gridFlowKeyPoints,
					'#grid-line',
				)}
			</svg>
			<svg id="grid1-flow">
				${renderPath(
					'grid-line1',
					'M 103 218 L 64.5 218',
					config.show_grid,
					gridColour,
					data.gridLineWidth,
				)}
				${renderCircle(
					'grid-dot1',
					Math.min(
						2 + data.gridLineWidth + Math.max(data.minLineWidth - 2, 0),
						8,
					),
					totalGridPower === 0 ? 'transparent' : gridColour,
					data.durationCur['grid1'],
					grid1FlowKeyPoints,
					'#grid-line1',
				)}
			</svg>
			${config.grid?.navigate
				? svg`
                    <a href="#" @click=${(e) => Utils.handleNavigation(e, config.grid.navigate)}>
                        ${renderGridIcons(data, config)}
                    </a>`
				: svg`
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.grid_connected_status_194)}>
                        ${renderGridIcons(data, config)}
                    </a>`}
			${config.grid?.navigate
				? svg`
                        <a href="#" @click=${(e) => Utils.handleNavigation(e, config.grid.navigate)}>
                            <g display="${config.show_grid && (config.grid.import_icon || config.grid.disconnected_icon || config.grid.export_icon) ? '' : 'none'}">
                                <foreignObject x="-0.5" y="187.5" width="70" height="70">
                                    <div xmlns="http://www.w3.org/1999/xhtml" style="position: fixed; width: 70px; height: 70px;">
                                        <ha-icon icon="${data.customGridIcon}" class="grid-icon"></ha-icon>
                                    </div>
                                </foreignObject>
                            </g>
                        </a>`
				: svg`
                        <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.grid_connected_status_194)}>
                            <g display="${config.show_grid && (config.grid.import_icon || config.grid.disconnected_icon || config.grid.export_icon) ? '' : 'none'}">
                                <foreignObject x="-0.5" y="187.5" width="70" height="70">
                                    <div xmlns="http://www.w3.org/1999/xhtml" style="position: fixed; width: 70px; height: 70px;">
                                        <ha-icon icon="${data.customGridIcon}" class="grid-icon"></ha-icon>
                                    </div>
                                </foreignObject>
                            </g>
                        </a>`}
			${createTextWithPopup(
				'daily_grid_buy_value',
				5,
				267.9,
				!config.show_grid ||
					data.gridShowDailyBuy !== true ||
					!data.stateDayGridImport.isValid(),
				'st10 left-align',
				gridColour,
				data.stateDayGridImport?.toPowerString(true, data.decimalPlacesEnergy),
				(e) => Utils.handlePopup(e, config.entities.day_grid_import_76),
				true,
			)}
			${createTextWithPopup(
				'daily_grid_sell_value',
				5,
				165,
				!config.show_grid ||
					data.gridShowDailySell !== true ||
					!data.stateDayGridExport.isValid(),
				'st10 left-align',
				gridColour,
				data.stateDayGridExport?.toPowerString(true, data.decimalPlacesEnergy),
				(e) => Utils.handlePopup(e, config.entities.day_grid_export_77),
				true,
			)}
			${createTextWithPopup(
				'max_sell_power',
				5,
				150,
				!config.show_grid ||
					!data.stateMaxSellPower.isValid ||
					!config.entities?.max_sell_power,
				'st3 left-align',
				['off', '0'].includes(data.stateSolarSell.state) ? 'grey' : gridColour,
				`${localize('common.limit')}: ${data.stateMaxSellPower.toPowerString(auto_scale, decimalPlaces)}`,
				(e) => Utils.handlePopup(e, config.entities.max_sell_power),
				true,
			)}
			${three_phase
				? config.entities?.grid_ct_power_total
					? svg`
                            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.grid_ct_power_total)}>
                            ${renderGridTotalPower(data, config, largeGridBox)}
                        </a>`
					: svg`
                            ${renderGridTotalPower(data, config, largeGridBox)}`
				: svg`
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.grid_ct_power_172)}>
                        ${renderGridTotalPower(data, config, largeGridBox)}
                    </a>`}
			${totalGridPower >= 0
				? svg`
                    ${createTextWithPopup(
											'energy_cost',
											hasGtPV ? '85' : '105',
											largeGridBox ? '179' : '195',
											!!(
												config.entities?.energy_cost_buy &&
												data.stateEnergyCostBuy.isValid()
											),
											`${!config.show_grid ? 'st12' : 'st3 left-align'}`,
											gridColour,
											`${Utils.formatNumberLocale(data.energyCost, 2)} ${data.stateEnergyCostBuy.getUOM()}`,
											(e) =>
												Utils.handlePopup(e, config.entities.energy_cost_buy),
										)}}`
				: svg`
                    ${createTextWithPopup(
											'energy_cost',
											hasGtPV ? '85' : '105',
											largeGridBox ? '179' : '195',
											!!(
												config.entities?.energy_cost_sell &&
												data.stateEnergyCostSell.isValid()
											),
											`${!config.show_grid ? 'st12' : 'st3 left-align'}`,
											gridColour,
											`${Utils.formatNumberLocale(data.energyCost, 2)} ${data.stateEnergyCostSell.getUOM()}`,
											(e) =>
												Utils.handlePopup(e, config.entities.energy_cost_sell),
											false,
										)}`}
			${createTextWithPopup(
				'prepaid',
				31.5,
				253,
				!config.show_grid || !data.statePrepaidUnits.isValid(),
				config.entities?.prepaid_units ? 'st3' : 'st12',
				gridColour,
				Utils.formatNumberLocale(data.statePrepaidUnits.toNum(1), 1),
				(e) => Utils.handlePopup(e, config.entities.prepaid_units),
				true,
			)}
			${createTextWithPopup(
				'grid-power-L1',
				80,
				largeGridBox ? '261' : '241',
				three_phase,
				!config.show_grid ? 'st12' : 'st3 left-align',
				gridColour,
				auto_scale
					? `${Utils.convertValue(data.gridPower, decimalPlaces) || 0}`
					: `${data.gridPower || 0} ${UnitOfPower.WATT}`,
				(e) => Utils.handlePopup(e, config.entities.grid_ct_power_172),
			)}
			${createTextWithPopup(
				'grid-power-L2',
				80,
				largeGridBox ? '274' : '254',
				!!(three_phase && config.entities?.grid_ct_power_L2),
				!config.show_grid ? 'st12' : 'st3 left-align',
				gridColour,
				auto_scale
					? `${Utils.convertValue(data.gridPowerL2, decimalPlaces) || 0}`
					: `${data.gridPowerL2 || 0} ${UnitOfPower.WATT}`,
				(e) => Utils.handlePopup(e, config.entities.grid_ct_power_L2),
			)}
			${createTextWithPopup(
				'grid-power-L3',
				80,
				largeGridBox ? '287' : '267',
				!!(three_phase && config.entities?.grid_ct_power_L3),
				!config.show_grid ? 'st12' : 'st3 left-align',
				gridColour,
				auto_scale
					? `${Utils.convertValue(data.gridPowerL3, decimalPlaces) || 0}`
					: `${data.gridPowerL3 || 0} ${UnitOfPower.WATT}`,
				(e) => Utils.handlePopup(e, config.entities.grid_ct_power_L3),
			)}
			// non-essential power
			${
				config.entities?.nonessential_power &&
				config.entities.nonessential_power !== 'none'
					? svg`
                    ${createTextWithPopup(
											'non_ess_power',
											137,
											306.5,
											!showNonessential,
											`${largeFont !== true ? 'st14' : 'st4'} st8`,
											flowNonEssColour,
											auto_scale
												? `${Utils.convertValue(data.nonessentialPower, decimalPlaces) || 0}`
												: `${data.nonessentialPower || 0} ${UnitOfPower.WATT}`,
											(e) =>
												Utils.handlePopup(
													e,
													config.entities.nonessential_power,
												),
											true,
										)}`
					: svg`
                    ${renderText(
											'non_ess_power',
											137,
											306.5,
											!showNonessential,
											`${largeFont !== true ? 'st14' : 'st4'} st8`,
											flowNonEssColour,
											auto_scale
												? `${Utils.convertValue(data.nonessentialPower, decimalPlaces) || 0}`
												: `${data.nonessentialPower || 0} ${UnitOfPower.WATT}`,
											true,
										)}`
			}

			<g>
				${
					showNonessential
						? renderLoad(
								'nonessen',
								'Lg-nonesscompact',
								data.essIconNE,
								data.essIconNESize,
								//isLiteCard ? 77.5 : 102.5,
                                xNeLoad,
								320.5,
								config.grid.non_essential_navigate,
								data.gridPercentageNE,
								data.batteryPercentageNE,
								dynamic_colour,
								flowNonEssColour,
								data,
							)
						: ''
				}
			</g>
			<rect
				id="nonesstotal"
				x="103"
				y="290"
				width="70"
				height="30"
				rx="4.5"
				ry="4.5"
				fill="none"
				stroke="${flowNonEssColour}"
				pointer-events="all"
				class="${!showNonessential ? 'st12' : ''}"
			/>
			${renderText(
				'noness',
				//isLiteCard ? 114 : 139,
                (xNeLoad + 36.5),
				396,
				!showNonessential,
				'st3 st8',
				flowNonEssColour,
				config.grid.nonessential_name || localize('common.nonessential_name'),
				true,
			)}
			<svg id="ne-flow">
				${renderPath(
					'ne-line',
					largeGridBox 
                        ? xNeLoad>10 
                            ? 'M 138 289 L 138 255' 
                            : 'M 42 320 L 42 314 Q 42 305 52 305 L 103 305 M 138 289 L 138 255'
                        : 'M 138 289 L 138 234',
					showNonessential,
					flowNonEssColour,
					data.nonessLineWidth,
				)}
				${renderCircle(
					'ne-dot',
					Math.min(
						2 + data.nonessLineWidth + Math.max(data.minLineWidth - 2, 0),
						5,
					),
					data.nonessentialPower <= 0 || !showNonessential
						? 'transparent'
						: flowNonEssColour,
					data.durationCur['ne'],
					'1;0',
					'#ne-line',
					invert_flow === true,
				)}
			</svg>
		</svg>
	`;
};
