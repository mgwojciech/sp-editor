/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { TemplateResult } from 'lit';
import { MgtTemplatedTaskComponent } from '@microsoft/mgt-element';
import '../../styles/style-helper';
import '../mgt-person/mgt-person';
/**
 * Web Component which represents events in a user or group calendar.
 *
 * @export
 * @class MgtAgenda
 * @extends {MgtTemplatedComponent}
 *
 * @fires {CustomEvent<undefined>} updated - Fired when the component is updated
 * @fires {CustomEvent<MicrosoftGraph.Event>} eventClick - Fired when user click an event
 *
 * @cssprop --event-box-shadow - {String} Event box shadow color and size
 * @cssprop --event-row-gap - {String} The size of the gap between two event elements
 * @cssprop --event-padding - {String} Event padding
 * @cssprop --event-background-color - {Color} Event background color
 * @cssprop --event-border - {String} Event border style
 * @cssprop --agenda-header-margin - {String} Agenda header margin size
 * @cssprop --agenda-header-font-size - {Length} Agenda header font size
 * @cssprop --agenda-header-color - {Color} Agenda header color
 * @cssprop --event-time-font-size - {Length} Event time font size
 * @cssprop --event-time-color - {Color} Event time color
 * @cssprop --event-subject-font-size - {Length} Event subject font size
 * @cssprop --event-subject-color - {Color} Event subject color
 * @cssprop --event-location-font-size - {Length} Event location font size
 * @cssprop --event-location-color - {Color} Event location color
 * @cssprop --event-attendees-color - {Color} Event attendees color
 */
export declare const registerMgtAgendaComponent: () => void;
export declare class MgtAgenda extends MgtTemplatedTaskComponent {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * using the `css` tag function.
     */
    static get styles(): import("lit").CSSResult[];
    /**
     * stores current date for initial calender selection in events.
     *
     * @type {string}
     */
    date: string;
    /**
     * determines if agenda events come from specific group
     *
     * @type {string}
     */
    groupId: string;
    /**
     * sets number of days until end date, 3 is the default
     *
     * @type {number}
     */
    days: number;
    /**
     * allows developer to specify a different graph query that retrieves events
     *
     * @type {string}
     */
    eventQuery: string;
    /**
     * array containing events from user agenda.
     *
     * @type {MicrosoftGraph.Event[]}
     */
    events: MicrosoftGraph.Event[];
    /**
     * allows developer to define max number of events shown
     *
     * @type {number}
     */
    showMax: number;
    /**
     * allows developer to define agenda to group events by day.
     *
     * @type {boolean}
     */
    groupByDay: boolean;
    /**
     * allows developer to specify preferred timezone that should be used for
     * rendering events retrieved from Graph, eg. `America/Los_Angeles`.
     * By default events are rendered using the current timezone of the
     * device being used.
     *
     * @type {string}
     */
    preferredTimezone: string;
    /**
     * Get the scopes required for agenda
     *
     * @static
     * @return {*}  {string[]}
     * @memberof MgtAgenda
     */
    static get requiredScopes(): string[];
    /**
     * determines width available for agenda component.
     *
     * @type {boolean}
     */
    private _isNarrow;
    /**
     * Determines width available if resize is necessary, adds onResize event listener to window
     *
     * @memberof MgtAgenda
     */
    connectedCallback(): void;
    /**
     * Removes onResize event listener from window
     *
     * @memberof MgtAgenda
     */
    disconnectedCallback(): void;
    /**
     * Invoked on each update to perform rendering tasks. This method must return a lit-html TemplateResult.
     * Setting properties inside this method will not trigger the element to update
     *
     * @returns
     * @memberof MgtAgenda
     */
    renderContent: () => TemplateResult;
    /**
     * Reloads the component with its current settings and potential new data
     *
     * @memberof MgtAgenda
     */
    reload(): Promise<void>;
    /**
     * Render the loading state
     *
     * @protected
     * @returns
     * @memberof MgtAgenda
     */
    protected renderLoading: () => TemplateResult;
    /**
     * Clears state of the component
     *
     * @protected
     * @memberof MgtAgenda
     */
    protected clearState(): void;
    /**
     * Render the no-data state.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtAgenda
     */
    protected renderNoData(): TemplateResult;
    /**
     * Render an individual Event.
     *
     * @protected
     * @param {MicrosoftGraph.Event} event
     * @returns
     * @memberof MgtAgenda
     */
    protected renderEvent(event: MicrosoftGraph.Event): TemplateResult;
    /**
     * Render the header for a group.
     * Only relevant for grouped Events.
     *
     * @protected
     * @param {Date} date
     * @returns
     * @memberof MgtAgenda
     */
    protected renderHeader(header: string): TemplateResult;
    /**
     * Render the title field of an Event
     *
     * @protected
     * @param {MicrosoftGraph.Event} event
     * @returns
     * @memberof MgtAgenda
     */
    protected renderTitle(event: MicrosoftGraph.Event): TemplateResult;
    /**
     * Render the location field of an Event
     *
     * @protected
     * @param {MicrosoftGraph.Event} event
     * @returns
     * @memberof MgtAgenda
     */
    protected renderLocation(event: MicrosoftGraph.Event): TemplateResult;
    /**
     * Render the attendees field of an Event
     *
     * @protected
     * @param {MicrosoftGraph.Event} event
     * @returns
     * @memberof MgtAgenda
     */
    protected renderAttendees(event: MicrosoftGraph.Event): TemplateResult;
    /**
     * Render the event other field of an Event
     *
     * @protected
     * @param {MicrosoftGraph.Event} event
     * @returns
     * @memberof MgtAgenda
     */
    protected renderOther(event: MicrosoftGraph.Event): TemplateResult;
    /**
     * Render the events in groups, each with a header.
     *
     * @protected
     * @param {MicrosoftGraph.Event[]} events
     * @returns {TemplateResult}
     * @memberof MgtAgenda
     */
    protected renderGroups(events: MicrosoftGraph.Event[]): TemplateResult;
    /**
     * Render a list of events.
     *
     * @protected
     * @param {MicrosoftGraph.Event[]} events
     * @returns {TemplateResult}
     * @memberof MgtAgenda
     */
    protected renderEvents(events: MicrosoftGraph.Event[]): TemplateResult;
    protected args(): (string | number)[];
    /**
     * Load state into the component
     *
     * @protected
     * @returns
     * @memberof MgtAgenda
     */
    protected loadState(): Promise<void>;
    private readonly onResize;
    private eventClicked;
    private getEventTimeString;
    private loadEvents;
    private prettyPrintTimeFromDateTime;
    private getDateHeaderFromDateTimeString;
}
//# sourceMappingURL=mgt-agenda.d.ts.map