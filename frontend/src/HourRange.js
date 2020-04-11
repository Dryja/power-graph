import React from 'react';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

const Handle = Slider.Handle;

const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
        <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={value}
            visible={dragging}
            placement="top"
            key={index}
        >
            <Handle value={value} {...restProps} />
        </Tooltip>
    );
};

class HourRange extends React.Component {
    constructor(props) {
        super(props);
        this.updateHour = props.updateHour;
        this.state = { currentHour: 1 };
        this.handleSliderUpdate = this.handleSliderUpdate.bind(this);
    }
    handleSliderUpdate(val) {
        if (val !== this.state.currentHour) {
            this.setState({ currentHour: val });
            this.updateHour(val);
        }
    }

    render() {
        return <div style={{ paddingTop: "20px" }}><h4>Choose an hour:</h4>
            <Slider handle={handle} min={1} max={24} dots={true} onAfterChange={this.handleSliderUpdate} />
            <p>Current hour: {this.state.currentHour}</p>
        </div>;
    }
}

export default HourRange;


