import { db } from "@/drizzle/db";
import { Application, ApplicationValue } from "@/drizzle/schema";
import { eq, sql } from "drizzle-orm";

export default async function ExportPage() {
  const data = await db
    .select({
      applicationId: Application.id,
      applicationName: Application.name,
      applicationSummary: Application.summary,
      applicationEntityName: Application.entityName,
      applicationDuration: Application.duration,
      applicationBudget: Application.budget,
      applicationTeamSummary: Application.teamSummary,
      applicationIdea: Application.idea,
      applicationReason: Application.reason,
      applicationState: Application.state,
      applicationGoals: Application.goals,
      applicationRequirements: Application.requirements,
      applicationUserId: Application.userId,
      waveId: Application.waveId,
      helpfulCount:
        sql<number>`count(case when ${ApplicationValue.value} = 'positive' then 1 end)`.mapWith(
          Number,
        ),
      spamCount:
        sql<number>`count(case when ${ApplicationValue.value} = 'spam' then 1 end)`.mapWith(
          Number,
        ),
    })
    .from(Application)
    .leftJoin(
      ApplicationValue,
      eq(Application.id, ApplicationValue.applicationId),
    )
    .groupBy(Application.id);

  return (
    <div className="overflow-scroll">
      <table className="border-spacing-2 border">
        <thead>
          <tr className="[&>th]:text-nowrap [&>th]:border [&>th]:text-start">
            <th>Application ID</th>
            <th>Application Name</th>
            <th>Application Summary</th>
            <th>Application Entity Name</th>
            <th>Application Duration</th>
            <th>Application Budget</th>
            <th>Application Team Summary</th>
            <th>Application Idea</th>
            <th>Application Reason</th>
            <th>Application State</th>
            <th>Application Goals</th>
            <th>Application Requirements</th>
            <th>Application User ID</th>
            <th>Wave ID</th>
            <th>Helpful count</th>
            <th>Spam count</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.applicationId}
              className="[&>td]:text-nowrap [&>td]:border"
            >
              <td>{item.applicationId}</td>
              <td>{item.applicationName}</td>
              <td>{item.applicationSummary}</td>
              <td>{item.applicationEntityName}</td>
              <td>{item.applicationDuration}</td>
              <td>{item.applicationBudget}</td>
              <td>{item.applicationTeamSummary}</td>
              <td>{item.applicationIdea}</td>
              <td>{item.applicationReason}</td>
              <td>{item.applicationState}</td>
              <td>{item.applicationGoals}</td>
              <td>{item.applicationRequirements}</td>
              <td>{item.applicationUserId}</td>
              <td>{item.waveId}</td>
              <td>{item.helpfulCount}</td>
              <td>{item.spamCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
