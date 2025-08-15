import React from 'react'
import { LuArrowRight } from 'react-icons/lu';
import moment from 'moment';
import TransectionInfoCard from '../Cards/TransectionInfoCard';
const RecentTransections = ({ transactions ,onSeeMore}) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Recent Transections</h5>
                <button className='card-btn' onClick={onSeeMore}>See All <LuArrowRight className='text-base'/></button>
            </div>
            <div>
                {transactions?.slice(0, 5)?.map((item) => {
                    console.log(item.type);
                    return (
                        <TransectionInfoCard
                            key={item._id}
                            title={item.type == 'expense' ? item.category : item.source}
                            icon={item.icon}
                            date={moment(item.date).format("Do MMM YYYYY")}
                            amount={item.amount}
                            type={item.type}
                            hideDeleteBtn
                        />
                    )
                })}
            </div>
        </div>
    );
};

export default RecentTransections
