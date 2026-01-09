"use client";

import {
    differenceInCalendarDays,
    eachDayOfInterval,
    formatISO,
    getDay,
    getMonth,
    getYear,
    nextDay,
    parseISO,
    subWeeks,
} from "date-fns";
import {
    createContext,
    Fragment,
    useContext,
    useMemo,
} from "react";

import { cn } from "../../lib/utils";

const DEFAULT_MONTH_LABELS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const DEFAULT_LABELS = {
    months: DEFAULT_MONTH_LABELS,
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    totalCount: "{{count}} activities in {{year}}",
    legend: {
        less: "Less",
        more: "More",
    },
};

// Updated Theme classes to use standard Tailwind colors that work well in dark/light
// effectively mapped to the levels 0-4
const THEME = cn(
    'data-[level="0"]:fill-gray-100 dark:data-[level="0"]:fill-[#161b22]',
    'data-[level="1"]:fill-green-200 dark:data-[level="1"]:fill-[#0e4429]',
    'data-[level="2"]:fill-green-400 dark:data-[level="2"]:fill-[#006d32]',
    'data-[level="3"]:fill-green-600 dark:data-[level="3"]:fill-[#26a641]',
    'data-[level="4"]:fill-green-800 dark:data-[level="4"]:fill-[#39d353]'
);

const ContributionGraphContext = createContext(null);

const useContributionGraph = () => {
    const context = useContext(ContributionGraphContext);

    if (!context) {
        throw new Error(
            "ContributionGraph components must be used within a ContributionGraph"
        );
    }

    return context;
};

const fillHoles = (activities) => {
    if (activities.length === 0) {
        return [];
    }

    // Sort activities by date to ensure correct date range
    const sortedActivities = [...activities].sort((a, b) =>
        a.date.localeCompare(b.date)
    );

    const calendar = new Map(
        activities.map((a) => [a.date, a])
    );

    const firstActivity = sortedActivities[0];
    const lastActivity = sortedActivities.at(-1);

    if (!lastActivity) {
        return [];
    }

    return eachDayOfInterval({
        start: parseISO(firstActivity.date),
        end: parseISO(lastActivity.date),
    }).map((day) => {
        const date = formatISO(day, { representation: "date" });

        if (calendar.has(date)) {
            return calendar.get(date);
        }

        return {
            date,
            count: 0,
            level: 0,
        };
    });
};

const groupByWeeks = (
    activities,
    weekStart = 0
) => {
    if (activities.length === 0) {
        return [];
    }

    const normalizedActivities = fillHoles(activities);
    const firstActivity = normalizedActivities[0];
    const firstDate = parseISO(firstActivity.date);
    const firstCalendarDate =
        getDay(firstDate) === weekStart
            ? firstDate
            : subWeeks(nextDay(firstDate, weekStart), 1);

    const paddedActivities = [
        ...(new Array(differenceInCalendarDays(firstDate, firstCalendarDate)).fill(
            undefined
        )),
        ...normalizedActivities,
    ];

    const numberOfWeeks = Math.ceil(paddedActivities.length / 7);

    return new Array(numberOfWeeks)
        .fill(undefined)
        .map((_, weekIndex) =>
            paddedActivities.slice(weekIndex * 7, weekIndex * 7 + 7)
        );
};

const getMonthLabels = (
    weeks,
    monthNames = DEFAULT_MONTH_LABELS
) => {
    return weeks
        .reduce((labels, week, weekIndex) => {
            const firstActivity = week.find((activity) => activity !== undefined);

            if (!firstActivity) {
                // Skip empty weeks (start of graph padding)
                return labels;
            }

            const month = monthNames[getMonth(parseISO(firstActivity.date))];

            if (!month) {
                return labels;
            }

            const prevLabel = labels.at(-1);

            if (weekIndex === 0 || !prevLabel || prevLabel.label !== month) {
                return labels.concat({ weekIndex, label: month });
            }

            return labels;
        }, [])
        .filter(({ weekIndex }, index, labels) => {
            const minWeeks = 3;

            if (index === 0) {
                return labels[1] && labels[1].weekIndex - weekIndex >= minWeeks;
            }

            if (index === labels.length - 1) {
                return weeks.slice(weekIndex).length >= minWeeks;
            }

            return true;
        });
};

export const ContributionGraph = ({
    data,
    blockMargin = 4,
    blockRadius = 2,
    blockSize = 12,
    fontSize = 14,
    labels: labelsProp = undefined,
    maxLevel: maxLevelProp = 4,
    style = {},
    totalCount: totalCountProp = undefined,
    weekStart = 0,
    className,
    children,
    ...props
}) => {
    const maxLevel = Math.max(1, maxLevelProp);
    const weeks = useMemo(() => groupByWeeks(data, weekStart), [data, weekStart]);
    const LABEL_MARGIN = 8;

    const labels = { ...DEFAULT_LABELS, ...labelsProp };
    const labelHeight = fontSize + LABEL_MARGIN;

    const year =
        data.length > 0
            ? getYear(parseISO(data[0].date))
            : new Date().getFullYear();

    const totalCount =
        typeof totalCountProp === "number"
            ? totalCountProp
            : data.reduce((sum, activity) => sum + activity.count, 0);

    const width = weeks.length * (blockSize + blockMargin) - blockMargin;
    const height = labelHeight + (blockSize + blockMargin) * 7 - blockMargin;

    if (data.length === 0) {
        return null;
    }

    return (
        <ContributionGraphContext.Provider
            value={{
                data,
                weeks,
                blockMargin,
                blockRadius,
                blockSize,
                fontSize,
                labels,
                labelHeight,
                maxLevel,
                totalCount,
                weekStart,
                year,
                width,
                height,
            }}
        >
            <div
                className={cn("flex w-max max-w-full flex-col gap-2", className)}
                style={{ fontSize, ...style }}
                {...props}
            >
                {children}
            </div>
        </ContributionGraphContext.Provider>
    );
};

export const ContributionGraphBlock = ({
    activity,
    dayIndex,
    weekIndex,
    className,
    ...props
}) => {
    const { blockSize, blockMargin, blockRadius, labelHeight, maxLevel } =
        useContributionGraph();

    // Safety check, although fillHoles should handle it
    const level = Math.min(Math.max(0, activity.level), maxLevel);

    return (
        <rect
            className={cn(THEME, className)}
            data-count={activity.count}
            data-date={activity.date}
            data-level={level}
            height={blockSize}
            rx={blockRadius}
            ry={blockRadius}
            width={blockSize}
            x={(blockSize + blockMargin) * weekIndex}
            y={labelHeight + (blockSize + blockMargin) * dayIndex}
            {...props}
        />
    );
};

export const ContributionGraphCalendar = ({
    title = "Contribution Graph",
    hideMonthLabels = false,
    className,
    children,
    ...props
}) => {
    const { weeks, width, height, blockSize, blockMargin, labels } =
        useContributionGraph();

    const monthLabels = useMemo(
        () => getMonthLabels(weeks, labels.months),
        [weeks, labels.months]
    );

    return (
        <div
            className={cn("max-w-full overflow-x-auto overflow-y-hidden custom-scrollbar pb-2 cursor-pointer", className)}
            {...props}
        >
            <svg
                className="block overflow-visible"
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                width={width}
            >
                <title>{title}</title>
                {!hideMonthLabels && (
                    <g className="fill-current text-gray-400 dark:text-gray-500">
                        {monthLabels.map(({ label, weekIndex }) => (
                            <text
                                dominantBaseline="hanging"
                                key={weekIndex}
                                x={(blockSize + blockMargin) * weekIndex}
                            >
                                {label}
                            </text>
                        ))}
                    </g>
                )}
                {weeks.map((week, weekIndex) =>
                    week.map((activity, dayIndex) => {
                        if (!activity) {
                            return null;
                        }

                        return (
                            <Fragment key={`${weekIndex}-${dayIndex}`}>
                                {children({ activity, dayIndex, weekIndex })}
                            </Fragment>
                        );
                    })
                )}
            </svg>
        </div>
    );
};

export const ContributionGraphMain = () => {
    return null; // Placeholder export if needed, main logic is in separate components
}
