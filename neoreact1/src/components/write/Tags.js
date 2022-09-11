import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MAX_NUM_TAGS } from '../../lib/constants';
import palette from '../../lib/palette';
import { TAG_PLACEHOLDER, WARNING_TAG_1, WARNING_TAG_2 } from '../../lib/msg';

const StyledP = styled.p`
    text-align: right;
    margin-top: -1.5rem;
    margin-left: 1rem;
    color: ${({ length }) => (length === MAX_NUM_TAGS ? '#a5d8ff' : '#adb5bd')};
`;

const TagsBlock = styled.div`
    margin-top: 2rem;

    .tagInput {
        font-size: 1rem;
        border: none;
        outline: none;
        border-bottom: 1px solid ${palette.gray[4]};
        width: 100%;
        &:focus {
            border-bottom: 1px solid ${palette.blue[4]};
        }
    }
    .warnMS {
        font-size: 0.8rem;
        color: ${palette.red[4]};
        display: inline-block;
    }
    .tagDiv {
        margin-top: 1rem;
    }
    .tagSpan {
        margin-left: 0.5rem;
        margin-top: 0.5rem;
        padding: 0.2rem 0.7rem 0.2rem 0.7rem;
        display: inline-block;
        font-size: 0.9rem;
        background-color: ${palette.gray[2]};

        &:hover {
            cursor: pointer;
            background-color: ${palette.gray[4]};
        }
    }
`;

const TagList = React.memo(({ localTags, onRemove }) => (
    <div className="tagDiv">
        {localTags &&
            localTags.map((tag) => (
                <span className="tagSpan" key={tag} onClick={() => onRemove(tag)}>
                    #{tag}
                </span>
            ))}
    </div>
));

const Tags = ({ onSubmitTags }) => {
    const [localTags, setLocalTags] = useState([]);
    const [value, setValue] = useState('');
    const [warnMS, setWarnMS] = useState('');

    const replaceValue = (value, flag) => {
        const replaced = value.replace(/ /g, '').replace(/,/g, '');
        if (flag) {
            const replaceSpecialChar = replaced.replace(/[\\{\\}[\]\\/?.;:|\\)*~`!^\-+<>@\\#$%&\\\\=\\(\\'\\"]/g, '');
            return replaceSpecialChar;
        }
        return replaced;
    };

    const onChange = (e) => {
        const targetValue = e.target.value;
        const replacedTargetValue = replaceValue(targetValue);
        setValue(replacedTargetValue);
    };

    const onKeyDown = (e) => {
        const keyCode = e.keyCode;

        const keyFlag =
            keyCode === 188 || 
            keyCode === 32 || 
            keyCode === 13; 

        if (keyFlag) {
            const replacedValue = replaceValue(value, keyFlag);

            if (value === '') return; 
            if (localTags.includes(replacedValue)) {
                setWarnMS(WARNING_TAG_1);
                return; 
            }
            if (localTags.length >= MAX_NUM_TAGS) {
                setWarnMS(WARNING_TAG_2);
                return; 
            }

            const filtering = [replacedValue].filter((element) => element !== '');
            setLocalTags(localTags.concat(filtering));
            setValue('');
        }
    };


    useEffect(() => {
        onSubmitTags(localTags);
    }, [localTags, onSubmitTags]);

    useEffect(() => {
        setWarnMS('');
    }, [value]);

    const onRemove = (localtag) => {
        setLocalTags(localTags.filter((tag) => tag !== localtag));
    };

    return (
        <TagsBlock>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    className="tagInput"
                    placeholder={TAG_PLACEHOLDER}
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    maxLength="15"
                />
                <StyledP length={localTags.length}>
                    {localTags.length}/{MAX_NUM_TAGS}
                </StyledP>
                {warnMS ? <div className="warnMS">{warnMS}</div> : null}
            </form>

            <TagList className="TagList" localTags={localTags} warnMS={warnMS} onRemove={onRemove} />
        </TagsBlock>
    );
};

export default Tags;
