// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./VerxioUserProfile.sol";

contract VerxioSubmitTask {
    address public owner;
    uint taskId;
    enum TaskStatus {
        Open,
        Ongoing,
        Review,
        Completed
    }

    struct Comment {
        address commenter;
        string text;
    }

    struct Task {
        uint taskId;
        address jobPoster;
        string jobPosterFirstName;
        string jobPosterLastName;
        string jobPosterBio;
        string jobPosterProfileUrl;
        string jobTitle;
        string jobDescription;
        string jobResponsibilities;
        string jobRequirements;
        string jobType;
        string paymentMethod;
        uint totalPeople;
        uint amount;
        string fileDocUrl;
        TaskStatus status;
        uint upvotes;
        uint downvotes;
        uint postedTime;
    }

    mapping(uint => Comment[]) private taskComments;
    mapping(uint => Task) private tasks;
    uint[] private taskIds;

    event TaskSubmitted(
        uint indexed taskId,
        address indexed jobPoster,
        string indexed jobTitle
    );

    event Upvoted(uint indexed taskId, address indexed voter);
    event Downvoted(uint indexed taskId, address indexed voter);
    event Commented(
        uint indexed taskId,
        address indexed commenter,
        string commentText
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    VerxioUserProfile public userProfileContract;

    // Chainlink Aggregator for AVAX/USDT price feed
    AggregatorV3Interface public priceFeed;

    address private constant AVAX_USD_FEED_ADDRESS =
        0x5498BB86BC934c8D34FDA08E81D444153d0D06aD;

    address userProfileAddress = 0x8a814de34f94B830d4009B9f6191a0E990a447F6;

    constructor() {
        owner = msg.sender;
        userProfileContract = VerxioUserProfile(userProfileAddress);
        priceFeed = AggregatorV3Interface(AVAX_USD_FEED_ADDRESS);
    }

    function submitTask(
        string memory _jobTitle,
        string memory _jobDescription,
        string memory _fileDocUrl,
        uint _totalPeople,
        uint _amountInUSD, // New parameter for the amount in USD
        string memory _jobType,
        string memory _paymentMethod,
        string memory _jobResponsibilities,
        string memory _jobRequirements
    ) public {
        taskId++;
        // Get job poster's profile information
        VerxioUserProfile.Profile memory jobPosterProfile = userProfileContract
            .getProfile(msg.sender);

        // Get the latest price from the Chainlink price feed
        (, int256 price, , , ) = priceFeed.latestRoundData();
        require(price > 0, "Invalid price feed data");

        // Convert the amount from USD to AVAX using the latest price
        uint amountInAVAX = (_amountInUSD * 1e18) / uint(price);

        // Create a new task with job poster's profile information
        Task storage newTask = tasks[taskId];
        newTask.taskId = taskId;
        newTask.jobPoster = msg.sender;
        newTask.jobPosterFirstName = jobPosterProfile.firstName;
        newTask.jobPosterLastName = jobPosterProfile.lastName;
        newTask.jobPosterBio = jobPosterProfile.bio;
        newTask.jobPosterProfileUrl = jobPosterProfile.profilePictureUrl;
        newTask.jobTitle = _jobTitle;
        newTask.jobDescription = _jobDescription;
        newTask.jobResponsibilities = _jobResponsibilities;
        newTask.jobRequirements = _jobRequirements;
        newTask.jobType = _jobType;
        newTask.paymentMethod = _paymentMethod;
        newTask.totalPeople = _totalPeople;
        newTask.amount = amountInAVAX; // Store the amount in AVAX
        newTask.fileDocUrl = _fileDocUrl;
        newTask.status = TaskStatus.Open;
        newTask.upvotes = 0;
        newTask.downvotes = 0;
        newTask.postedTime = block.timestamp;

        tasks[taskId] = newTask;
        taskIds.push(taskId);

        emit TaskSubmitted(taskId, msg.sender, newTask.jobTitle);
    }

    function upvoteTask(uint _taskId) public {
        Task storage task = tasks[_taskId];
        require(task.status == TaskStatus.Open, "Task is not open for voting");

        task.upvotes++;
        emit Upvoted(_taskId, msg.sender);
    }

    function downvoteTask(uint _taskId) public {
        Task storage task = tasks[_taskId];
        require(task.status == TaskStatus.Open, "Task is not open for voting");

        task.downvotes++;
        emit Downvoted(_taskId, msg.sender);
    }

    function getTask(uint _taskId) public view returns (Task memory) {
        return tasks[_taskId];
    }

    function commentOnTask(uint _taskId, string memory _commentText) public {
        Task storage task = tasks[_taskId];
        require(
            task.status == TaskStatus.Open,
            "Task is not open for commenting"
        );

        Comment memory newComment = Comment({
            commenter: msg.sender,
            text: _commentText
        });

        taskComments[_taskId].push(newComment);
        emit Commented(_taskId, msg.sender, _commentText);
    }

    function getTaskComments(
        uint _taskId
    ) public view returns (Comment[] memory) {
        return taskComments[_taskId];
    }

    function getAllTasks() public view returns (Task[] memory) {
        Task[] memory allTasks = new Task[](taskIds.length);

        for (uint i = 0; i < taskIds.length; i++) {
            Task storage task = tasks[taskIds[i]];
            allTasks[i] = task;
        }

        return allTasks;
    }
}
