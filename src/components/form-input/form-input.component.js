import './form-input.styles.scss';

export const FormInput = ({label, ...otherProps}) =>
    <div className='group'>
        <input className='form-input' {...otherProps}/>
        {label &&
            <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
        }
    </div>;
