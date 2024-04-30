import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Chat = () => {
	return (
		<div className='flex sm:h-[450px] md:h-[550px] w-full rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar className='w-full sm:w-auto' />
			<MessageContainer/>
		</div>
	);
};
export default Chat;
