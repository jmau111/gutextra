import './style.scss';

import { registerBlockType } from "@wordpress/blocks";
import {
  RichText,
  InspectorControls
} from "@wordpress/block-editor";

import { Fragment } from "@wordpress/element";

import { SelectControl } from "@wordpress/components";

import { __ } from "@wordpress/i18n";

registerBlockType("gutextra/alerts", {
  title: __('Alerts', 'gutextra'),
  icon: "pressthis",
  category: "common",
  attributes: {
    type: {
      type: "string",
      default: "default"
    },
    alert: {
      type: "array",
      source: "children",
      selector: ".alert",
      default: []
    }
  },

  edit({ attributes, setAttributes, className }) {
    const { type, alert } = attributes;

    const updateNote = alert => setAttributes({ alert });
    const updateType = type => setAttributes({ type });

    return (
      <Fragment>
        <div className={className + " alert-" + type}>
          <RichText
            className="alert"
            value={alert}
            onChange={updateNote}
            placeholder={__("Write an alert", "gutextra")}
          />
        </div>
        <InspectorControls>
          <SelectControl
            label={__("Alert type", "gutextra")}
            value={type}
            options={[
              { label: __("Default", "gutextra"), value: "default" },
              { label: __("Danger", "gutextra"), value: "danger" },
              { label: __("Warning", "gutextra"), value: "warning" },
              { label: __("Info", "gutextra"), value: "info" },
              { label: __("Success", "gutextra"), value: "success" }
            ]}
            onChange={updateType}
          />
        </InspectorControls>
      </Fragment>
    );
  },

  save({ attributes }) {
    const { type, alert } = attributes;
    return (
      <div className={"alert-" + type}>
        <p className="alert">{alert}</p>
      </div>
    );
  }
});
