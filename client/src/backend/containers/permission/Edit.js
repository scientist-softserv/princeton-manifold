import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Form from "./Form";
import Dialog from "backend/components/dialog";
import { permissionsAPI, requests } from "api";
import { entityStoreActions } from "actions";
import connectAndFetch from "utils/connectAndFetch";
import { select } from "utils/entityUtils";
import Navigation from "backend/components/navigation";

const { request, flush } = entityStoreActions;

export class PermissionEdit extends PureComponent {
  static mapStateToProps = state => {
    return {
      permission: select(requests.bePermission, state.entityStore)
    };
  };

  static displayName = "Permission.Edit";

  static propTypes = {
    entity: PropTypes.object,
    permission: PropTypes.object,
    match: PropTypes.object,
    dispatch: PropTypes.func,
    closeUrl: PropTypes.string.isRequired,
    history: PropTypes.object
  };

  constructor() {
    super();
    this.state = { confirmation: null };
  }

  componentDidMount() {
    this.fetchPermission(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchPermission(this.props.match.params.id);
    }
  }

  componentWillUnmount() {
    this.props.dispatch(flush(requests.bePermission));
  }

  fetchPermission(id) {
    const entity = this.props.entity;
    const action = request(
      permissionsAPI.show(entity, id),
      requests.bePermission
    );
    this.props.dispatch(action);
  }

  handleRemoveAll(event, permission) {
    const heading =
      "Are you sure you want to remove all permissions from this user?";
    const message = "This action cannot be undone.";
    new Promise((resolve, reject) => {
      this.setState({
        confirmation: { resolve, reject, heading, message }
      });
    }).then(
      () => {
        this.removeAllPermissions(permission);
        this.closeDialog();
      },
      () => {
        this.closeDialog();
      }
    );
  }

  closeDialog() {
    this.setState({ confirmation: null });
  }

  removeAllPermissions(permission) {
    event.preventDefault();
    const entity = this.props.entity;
    const options = { removes: permission };
    const action = request(
      permissionsAPI.destroy(entity, permission.id),
      requests.bePermissionDestroy,
      options
    );
    this.props.dispatch(action).promise.then(() => {
      this.props.history.push(this.props.closeUrl);
    });
  }

  render() {
    const permission = this.props.permission;
    if (!permission) return null;

    return (
      <section>
        {this.state.confirmation ? (
          <Dialog.Confirm {...this.state.confirmation} />
        ) : null}
        <Navigation.DrawerHeader
          title="Edit Permission"
          buttons={[
            {
              onClick: event => {
                this.handleRemoveAll(event, permission);
              },
              icon: "trash",
              label: "Delete User Permissions"
            }
          ]}
        />
        <Form
          entity={this.props.entity}
          permission={permission}
          history={this.props.history}
          showUserInput
        />
      </section>
    );
  }
}

export default connectAndFetch(PermissionEdit);
