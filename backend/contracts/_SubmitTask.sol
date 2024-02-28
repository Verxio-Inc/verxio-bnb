// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

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
        string jobTitle;
        string jobDescription;
        string jobResponsibilities;
        string jobRequirements;
        string jobRewardPool;
        string jobType;
        string paymentToken;
        uint totalPeople;
        uint prizePoolAmount;
        uint prizePoolUSDAmount;
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

    // Chainlink Aggregator for price feed
    AggregatorV3Interface public avaxPriceFeed;
    AggregatorV3Interface public ethUsdPriceFeed;
    AggregatorV3Interface public btcUsdPriceFeed;
    AggregatorV3Interface public usdtUsdPriceFeed;

    address private constant AVAX_USD_FEED_ADDRESS = 0x5498BB86BC934c8D34FDA08E81D444153d0D06aD;
    address private constant ETH_USD_FEED_ADDRESS = 0x86d67c3D38D2bCeE722E601025C25a575021c6EA;
    address private constant BTC_USD_FEED_ADDRESS = 0x31CF013A08c6Ac228C94551d535d5BAfE19c602a;
    address private constant USDT_USD_FEED_ADDRESS = 0x7898AcCC83587C3C55116c5230C17a6Cd9C71bad;

    constructor() {
        owner = msg.sender;
        avaxPriceFeed = AggregatorV3Interface(AVAX_USD_FEED_ADDRESS);
        ethUsdPriceFeed = AggregatorV3Interface(ETH_USD_FEED_ADDRESS);
        btcUsdPriceFeed = AggregatorV3Interface(BTC_USD_FEED_ADDRESS);
        usdtUsdPriceFeed = AggregatorV3Interface(USDT_USD_FEED_ADDRESS);
    }

    function submitTask(
        string memory _jobTitle,
        string memory _jobDescription,
        string memory _fileDocUrl,
        uint _totalPeople,
        uint _prizePoolAmount,
        string memory _jobType,
        string memory _paymentToken,
        string memory _jobResponsibilities,
        string memory _jobRequirements,
        string memory _jobRewardPool
    ) public {
        taskId++;
        uint USDAmount;

        // Get the latest price from the Chainlink price feed based on the payment token
        if (compareStrings(_paymentToken, "AVAX")) {
            (, int256 price, , , ) = avaxPriceFeed.latestRoundData();
            require(price > 0, "Invalid price feed data");
            USDAmount = (_prizePoolAmount * uint(price)) / 1e8;

        } else if (compareStrings(_paymentToken, "ETH")) {
            (, int256 price, , , ) = ethUsdPriceFeed.latestRoundData();
            require(price > 0, "Invalid ETH price feed data");
            USDAmount = (_prizePoolAmount * uint(price)) / 1e8;

        } else if (compareStrings(_paymentToken, "BTC")) {
            (, int256 price, , , ) = btcUsdPriceFeed.latestRoundData();
            require(price > 0, "Invalid BTC price feed data");
           USDAmount = (_prizePoolAmount * uint(price)) / 1e8;

        } else if (compareStrings(_paymentToken, "USDT")) {
            (, int256 price, , , ) = usdtUsdPriceFeed.latestRoundData();
            require(price > 0, "Invalid USDT price feed data");
            USDAmount = (_prizePoolAmount * uint(price)) / 1e8;

        } else {
            revert("Invalid payment token");
        }

        // Create a new task with job poster's info
        Task storage newTask = tasks[taskId];
        newTask.taskId = taskId;
        newTask.jobPoster = msg.sender;
        newTask.jobTitle = _jobTitle;
        newTask.jobDescription = _jobDescription;
        newTask.jobResponsibilities = _jobResponsibilities;
        newTask.jobRequirements = _jobRequirements;
        newTask.jobRewardPool = _jobRewardPool;
        newTask.jobType = _jobType;
        newTask.paymentToken = _paymentToken;
        newTask.totalPeople = _totalPeople;
        newTask.prizePoolAmount = _prizePoolAmount; 
        newTask.prizePoolUSDAmount = USDAmount;
        newTask.fileDocUrl = _fileDocUrl;
        newTask.status = TaskStatus.Open;
        newTask.upvotes = 0;
        newTask.downvotes = 0;
        newTask.postedTime = block.timestamp;

        tasks[taskId] = newTask;
        taskIds.push(taskId);

        emit TaskSubmitted(taskId, msg.sender, newTask.jobTitle);
    }

    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
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