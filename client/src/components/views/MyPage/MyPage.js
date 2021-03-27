import React from 'react';

function MyPage(props) {
    const wrapperStyles = {
        // display: 'flex',
        // justifyContent:'space-between'
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gridGap: '1rem',
        minHeight: '500px',
        backgroundColor: 'ffff00'
    }
    const item={
        backgroundColor:"#ff0000"
    }
    return (
        // <div style={{display:'flex', justifyContent:'space-between'}}>
        <div style={wrapperStyles}
        >
            <div style={item}>프로필1</div>
            <div>정보</div>
            {/*<div className="item">이력</div>*/}
        </div>

    );
}

export default MyPage;