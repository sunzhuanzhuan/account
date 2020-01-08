import React from 'react';
export const NotExistModalContent = ({
    accountList = [],
    notExistAccountIds = [],
    notExistAccountIdsByMcnId = [],
    alreadyHaveRuleAccountIds = []
}) => {
    return <div>
        {
            accountList.length > 0 ?
                `${accountList.length}个账号添加成功`
                : '请重新添加账号'
        }
        {alreadyHaveRuleAccountIds.length > 0 && <p>
            以下账号已有规则{alreadyHaveRuleAccountIds.join(', ')}
        </p>}
        {notExistAccountIds.length > 0 || notExistAccountIdsByMcnId.length > 0 && <p>以下账号ID不存在</p>}
        {notExistAccountIds.length > 0 && <p>不存在的accountId: {notExistAccountIds.join(", ")}</p>}
        {notExistAccountIdsByMcnId.length > 0 && <p>不在该主账号旗下的accountId: {notExistAccountIdsByMcnId.join(', ')}</p>}
    </div>
}