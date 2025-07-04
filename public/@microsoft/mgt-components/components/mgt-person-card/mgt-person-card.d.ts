/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { nothing, TemplateResult } from 'lit';
import { MgtTemplatedTaskComponent } from '@microsoft/mgt-element';
import { Presence } from '@microsoft/microsoft-graph-types';
import { IDynamicPerson } from '../../graph/types';
import '../sub-components/mgt-spinner/mgt-spinner';
export * from './mgt-person-card.types';
import { CardSection } from '../BasePersonCardSection';
import { IHistoryClearer, IExpandable } from './types';
export declare const registerMgtPersonCardComponent: () => void;
/**
 * Web Component used to show detailed data for a person in the Microsoft Graph
 *
 * @export
 * @class MgtPersonCard
 * @extends {MgtTemplatedComponent}
 *
 * @fires {CustomEvent<undefined>} updated - Fired when the component is updated
 * @fires {CustomEvent<null>} expanded - Fired when expanded details section is opened
 *
 * @cssprop --person-card-line1-font-size - {Length} Font size of line 1
 * @cssprop --person-card-line1-font-weight - {FontWeight} Font weight of line 1
 * @cssprop --person-card-line1-line-height - {Length} Line height of line 1
 * @cssprop --person-card-line2-font-size - {Length} Font size of line 2
 * @cssprop --person-card-line2-font-weight - {FontWeight} Font weight of line 2
 * @cssprop --person-card-line2-line-height - {Length} Line height of line 2
 * @cssprop --person-card-line3-font-size - {Length} Font size of line 3
 * @cssprop --person-card-line3-font-weight - {FontWeight} Font weight of line 3
 * @cssprop --person-card-line3-line-height - {Length} Line height of line 3
 * @cssprop --person-card-avatar-size - {Length} Width and height of the avatar. Default is 75px
 * @cssprop --person-card-details-left-spacing - {Length} The space between the avatar and the person details. Default is 15px
 * @cssprop --person-card-avatar-top-spacing - {Length} The margin top of the avatar in person-card component
 * @cssprop --person-card-details-bottom-spacing - {Length} The margin bottom of the person details in person-card component
 * @cssprop --person-card-base-icons-left-spacing - {Length} The margin-inline-start of the base-icons in person-card component
 * @cssprop --person-card-background-color - {Color} The color of the person-card-component
 * @cssprop --person-card-expanded-background-color-hover - {Color} The hover color of the expanded details button of the person card component
 * @cssprop --person-card-nav-back-arrow-hover-color - {Color} The hover color of the back arrow of the person card component
 * @cssprop --person-card-icon-color - {Color} The color of the icons in the person card component
 * @cssprop --person-card-icon-hover-color - {Color} The hover color of the icons in the person card component
 * @cssprop --person-card-show-more-color - {Color} The color of the show more text in the person card component
 * @cssprop --person-card-show-more-hover-color - {Color} The hover color of the show more text in person card component
 * @cssprop --person-card-fluent-background-color - {Color} The background color of the fluent buttons in person card component
 * @cssprop --person-card-line1-text-color - {Color} The color of line 1 in person card
 * @cssprop --person-card-line2-text-color - {Color} The color of line 2 in person card
 * @cssprop --person-card-line3-text-color - {Color} The color of line 3 in person card
 * @cssprop --person-card-fluent-background-color-hover - {Color} The hover background color of the fluent buttons in person card component
 * @cssprop --person-card-chat-input-hover-color - {Color} The chat input hover color
 * @cssprop --person-card-chat-input-focus-color - {Color} The chat input focus color
 * @cssprop --contact-title-color - {Color} The color of the contact title in the contact section of the person card component
 * @cssprop --contact-value-color - {Color} The color of the contact value in the contact section of the person card component
 * @cssprop --contact-link-color - {Color} The color of the contact link in the contact section of the person card component
 * @cssprop --contact-link-hover-color - {Color} The hover color of the contact link in the contact section of the person card component
 * @cssprop --contact-background-color - {Color} The background color of the contact section in person card component
 * @cssprop --contact-copy-icon-color - {Color} The color of the copy icon in the contact section of the person card component
 * @cssprop --message-subject-font-size - {Length} The font size of the message subject in the message section of the person card component
 * @cssprop --message-subject-font-weight - {FontWeight} The font weight of the message subject in the message section of the person card component
 * @cssprop --message-subject-line-height - {Length} The line height of the message subject in the message section of the person card component
 * @cssprop --message-from-font-size - {Length} The font size of the message sender in the message section of the person card component
 * @cssprop --message-from-font-weight - {FontWeight} The font weight of the message sender in the message section of the person card component
 * @cssprop --message-subject-color - {Color} The color of the message subject in the message section of the person card component
 * @cssprop --message-from-color - {Color} The color of the message sender in the message section of the person card component
 * @cssprop --message-color - {Color} The color of the message in the message section of the person card component
 * @cssprop --message-hover-color - {Color} The hover color of the message section of the person card component
 * @cssprop --message-date-color - {Color} The color of the message date in the message section of the person card component
 * @cssprop --message-from-line-height - {Length} The line height of the message sender in the message section of the person card component
 * @cssprop --profile-background-color - {Color} The background color of the profile section in the person card component
 * @cssprop --profile-title-color - {Color} The color of the profile title in the profile section of the person card component
 * @cssprop --profile-section-title-color - {Color} The color of the profile section title in the profile section of the person card component
 * @cssprop --profile-token-item-color - {Color} The color of the profile token item in the profile section of the person card component
 * @cssprop --profile-token-item-background-color - {Color} The background color of the profile token item in the profile section of the person card component
 * @cssprop --profile-token-overflow-color - {Color} The color of the profile token overflow in the profile section of the person card component
 * @cssprop --organization-active-org-member-border-color - {Color} The border color of the active organization member in the organization section of the person card component
 * @cssprop --organization-active-org-member-target-background-color - {Color} The background color of the active organization member target in the organization section of the person card component
 * @cssprop --organization-coworker-hover-color - {Color} The hover color of the coworker in the organization section of the person card component
 * @cssprop --organization-coworker-border-color - {Color} The border color of the coworker in the organization section of the person card component
 * @cssprop --organization-coworker-person-avatar-size - {Length} The avatar size of the coworker in the organization section of the person card component
 * @cssprop --organization-member-person-avatar-size - {Length} The avatar size of the member in the organization section of the person card component
 * @cssprop --organization-direct-report-person-avatar-size - {Length} The avatar size of the direct report in the organization section of the person card component
 * @cssprop --organization-title-color - {Color} The color of the organization title in the organization section of the person card component
 * @cssprop --organization-sub-title-color - {Color} The color of the organization sub-title in the organization section of the person card component
 * @cssprop --organization-hover-color - {Color} The hover color of the organization section of the person card component
 * @cssprop --profile-background-color - {Color} The background color of the profile section in the person card component
 * @cssprop --profile-title-color - {Color} The color of the profile title in the profile section of the person card component
 * @cssprop --profile-section-title-color - {Color} The color of the profile section title of the person card component
 * @cssprop --profile-token-item-color - {Color} The color of the token item in the profile section of the person card component
 * @cssprop --profile-token-item-background-color - {Color} The background color of the token item in the profile section of the person card component
 * @cssprop --profile-token-overflow-color - {Color} The color of the token overflow in the profile section of the person card component
 *
 */
export declare class MgtPersonCard extends MgtTemplatedTaskComponent implements IHistoryClearer, IExpandable {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * using the `css` tag function.
     */
    static get styles(): import("lit").CSSResult[];
    /**
     * Strings to use for localization
     *
     * @readonly
     * @protected
     * @memberof MgtPersonCard
     */
    protected get strings(): {
        showMoreSectionButton: string;
        endOfCard: string;
        quickMessage: string;
        expandDetailsLabel: string;
        sendMessageLabel: string;
        emailButtonLabel: string;
        callButtonLabel: string;
        chatButtonLabel: string;
        closeCardLabel: string;
        videoButtonLabel: string;
        goBackLabel: string;
    };
    /**
     * Get the scopes required for the person card
     * The scopes depend on what sections are shown
     *
     * Use the `MgtPersonCard.config` object to configure
     * what sections are shown
     *
     * @static
     * @return {*}  {string[]}
     * @memberof MgtPersonCard
     */
    static get requiredScopes(): string[];
    /**
     * Set the person details to render
     *
     * @type {IDynamicPerson}
     * @memberof MgtPersonCard
     */
    get personDetails(): IDynamicPerson;
    set personDetails(value: IDynamicPerson);
    private _personQuery;
    /**
     * allows developer to define name of person for component
     *
     * @type {string}
     */
    get personQuery(): string;
    set personQuery(value: string);
    /**
     * allows the locking of navigation using tabs to not flow out of the card section
     *
     * @type {boolean}
     */
    lockTabNavigation: boolean;
    /**
     * user-id property allows developer to use id value for component
     *
     * @type {string}
     */
    get userId(): string;
    set userId(value: string);
    /**
     * Set the image of the person
     * Set to '@' to look up image from the graph
     *
     * @type {string}
     * @memberof MgtPersonCard
     */
    personImage: string;
    /**
     * Sets whether the person image should be fetched
     * from the Microsoft Graph based on the personDetails
     * provided by the user
     *
     * @type {boolean}
     * @memberof MgtPerson
     */
    fetchImage: boolean;
    /**
     * Gets or sets whether expanded details section is rendered
     *
     * @type {boolean}
     * @memberof MgtPersonCard
     */
    isExpanded: boolean;
    /**
     * Gets or sets whether person details should be inherited from an mgt-person parent
     * Useful when used as template in an mgt-person component
     *
     * @type {boolean}
     * @memberof MgtPersonCard
     */
    inheritDetails: boolean;
    /**
     * determines if person card component renders presence
     *
     * @type {boolean}
     */
    showPresence: boolean;
    /**
     * Gets or sets presence of person
     *
     * @type {MicrosoftGraph.Presence}
     * @memberof MgtPerson
     */
    personPresence: Presence;
    private isSendingMessage;
    /**
     * The subsections for display in the lower part of the card
     *
     * @protected
     * @type {any[]}
     * @memberof MgtPersonCard
     */
    protected sections: CardSection[];
    private _cardState;
    private _isStateLoading;
    private _history;
    private _chatInput;
    private _currentSection;
    private _personDetails;
    private _me;
    private _smallView;
    private _windowHeight;
    private _userId;
    private _graph;
    private get internalPersonDetails();
    constructor();
    /**
     * Navigate the card to a different person.
     *
     * @protected
     * @memberof MgtPersonCard
     */
    navigate(person: IDynamicPerson): void;
    /**
     * Navigate the card back to the previous person
     *
     * @returns {void}
     * @memberof MgtPersonCard
     */
    goBack: () => void;
    /**
     * Navigate the card back to first person and clear history
     *
     * @returns {void}
     * @memberof MgtPersonCard
     */
    clearHistory(): void;
    protected args(): unknown[];
    /**
     * Invoked from the base class when the loadState promise has completed.
     */
    protected readonly renderContent: () => TemplateResult;
    private readonly handleEndOfCard;
    /**
     * Render the state when no data is available.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPersonCard
     */
    protected closeCard: () => void;
    /**
     * Render the state when no data is available.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPersonCard
     */
    protected renderNoData(): TemplateResult;
    /**
     * Render a display image for the person.
     *
     * @protected
     * @param {*} image
     * @memberof MgtPersonCard
     */
    protected renderPerson(): TemplateResult;
    /**
     * Render person subtitle.
     *
     * @protected
     * @param {IDynamicPerson} person
     * @returns {TemplateResult}
     * @memberof MgtPersonCard
     */
    protected renderPersonSubtitle(person?: IDynamicPerson): TemplateResult;
    /**
     * Render the various icons for contacting the person.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPersonCard
     */
    protected renderContactIcons(person?: IDynamicPerson): TemplateResult;
    /**
     * Render the button used to expand the expanded details.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPersonCard
     */
    protected renderExpandedDetailsButton(): TemplateResult;
    /**
     * Render expanded details.
     *
     * @protected
     * @param {IDynamicPerson} [person]
     * @returns {TemplateResult}
     * @memberof MgtPersonCard
     */
    protected renderExpandedDetails(): TemplateResult;
    /**
     * Render the navigation ribbon for subsections
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPersonCard
     */
    protected renderSectionNavigation(): TemplateResult;
    /**
     * Render the default section with compact views for each subsection.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPersonCard
     */
    protected renderOverviewSection(): TemplateResult;
    /**
     * Render the actively selected section.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPersonCard
     */
    protected renderCurrentSection(): TemplateResult;
    /**
     * Render the messaging section.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPersonCard
     */
    protected renderMessagingSection(): TemplateResult<1> | typeof nothing;
    /**
     * load state into the component
     *
     * @protected
     * @returns
     * @memberof MgtPersonCard
     */
    protected loadState(): Promise<void>;
    /**
     * Send a chat message to the user from the quick message input.
     *
     * @protected
     * @returns {void}
     * @memberof MgtPersonCard
     */
    protected sendQuickMessage: () => Promise<void>;
    /**
     * Use the mailto: protocol to initiate a new email to the user.
     *
     * @protected
     * @memberof MgtPersonCard
     */
    protected emailUser: () => void;
    private get hasPhone();
    /**
     * Use the tel: protocol to initiate a new call to the user.
     *
     * @protected
     * @memberof MgtPersonCard
     */
    protected callUser: () => void;
    /**
     * Initiate a chat message to the user via deeplink.
     *
     * @protected
     * @memberof MgtPersonCard
     */
    protected chatUser: (message?: string) => void;
    /**
     * Initiate a teams call with video with a user via deeplink.
     *
     * @protected
     * @memberof MgtPersonCard
     */
    protected videoCallUser: () => void;
    /**
     * Display the expanded details panel.
     *
     * @protected
     * @memberof MgtPersonCard
     */
    protected showExpandedDetails: () => void;
    private loadSections;
    private getImage;
    private clearInputData;
    private getPersonBusinessPhones;
    private updateCurrentSection;
    private handleSectionScroll;
    private readonly sendQuickMessageOnEnter;
    private readonly handleGoBack;
}
//# sourceMappingURL=mgt-person-card.d.ts.map