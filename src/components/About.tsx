import NavBar from "./NavBar"
import Footer from "./Footer"

const About = () => {
  return (
    <div>
      <NavBar />
      <div className="w-full max-w-full min-h-[620px] flex flex-col items-center bg-gray-100 py-10 hero">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-6xl w-full px-5">
          <div className="space-y-5 order-1 sm:order-1 bg-white p-5 rounded-lg shadow-lg">
            <p className="text-blue-500 text-2xl font-serif">
              Organize your projects
            </p>
            <p className="text-gray-700">
              Break down complex projects into milestones, task lists, tasks, and sub tasks to manage them more efficiently. Assign tasks to your team and track their progress to ensure you finish on time.
            </p>
          </div>
          <div className="order-2 sm:order-2 bg-white p-5 rounded-lg shadow-lg">
            <p className="text-blue-500 text-2xl font-serif">
              Manage your timeline
            </p>
            <p className="text-gray-700">
              Create dependencies between related tasks to make sure they're completed in a particular order. Do certain tasks repeat from time to time? Set up a recurring task to repeat at the desired intervals and add reminders so nothing slips your mind!
            </p>
          </div>
          <div className="order-3 sm:order-3 bg-white p-5 rounded-lg shadow-lg">
            <p className="text-blue-500 text-2xl font-serif">
              Visualize your progress
            </p>
            <p className="text-gray-700">
              The Gantt chart feature shows the current progress of your tasks in comparison to what was initially planned. Get comprehensive insights into your team and your work with customized dashboards and reports so your projects are always completed before their deadlines.
            </p>
          </div>
          <div className="order-4 sm:order-4 bg-white p-5 rounded-lg shadow-lg">
            <p className="text-blue-500 text-2xl font-serif">
              Collaborate with your team
            </p>
            <p className="text-gray-700">
              Use our collaboration tools to communicate with your team, share files, and keep everyone on the same page. Ensure that everyone is aligned and working towards the same goals.
            </p>
          </div>
          <div className="order-5 sm:order-5 bg-white p-5 rounded-lg shadow-lg">
            <p className="text-blue-500 text-2xl font-serif">
              Track time spent
            </p>
            <p className="text-gray-700">
              Keep track of the time spent on each task and project. Use our time tracking tools to monitor productivity and ensure that your team is working efficiently.
            </p>
          </div>
          <div className="order-6 sm:order-6 bg-white p-5 rounded-lg shadow-lg">
            <p className="text-blue-500 text-2xl font-serif">
              Integrate with other tools
            </p>
            <p className="text-gray-700">
              Seamlessly integrate with other tools and services you use daily. Connect with your favorite apps to streamline your workflow and increase productivity.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About