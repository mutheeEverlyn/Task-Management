import aboutPic from '../assets/aboutPic.jpg'
const About = () => {
  return (
    <div>
      <div><img src={aboutPic} alt="about pic" /></div>
      <div className="w-full max-w-full min-h-[620px] flex">
      <div className="grid grid-cols-1 sm:grid-cols-3 place-items-center">
        <div className="space-y-5 order-1 sm:order-1 sm:pr-32 ">
          <p className="text-blue-400 text-2xl font-serif">
          Organize your projects
          Break down complex projects into milestones, task lists, tasks, and sub tasks to manage them more efficiently. Assign tasks to your team and track their progress to ensure you finish on time.
            </p>
        </div>
        <div className="order-2 sm:order-2 sm:pr-32 space-y-5">
        <p className="text-blue-400 text-2xl font-serif">
        Manage your timeline
        Create dependencies between related tasks to make sure they're completed in a particular order. Do certain tasks repeat from time to time? Set up a recurring task to repeat at the desired intervals and add reminders so nothing slips your mind!
              </p>
        </div>
        <div className="order-3 sm:order-3 sm:pr-32 space-y-5">
        <p className="text-blue-400 text-2xl font-serif">
        Visualize your progress
        The Gantt chart feature shows the current progress of your tasks in comparison to what was initially planned. Get comprehensive insights into your team and your work with customized dashboards and reports so your projects are always completed before their deadlines.
              </p>
        </div>
      </div>
    </div> 
    </div>
  )
}

export default About
