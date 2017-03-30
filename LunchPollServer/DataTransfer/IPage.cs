using System.Collections.Generic;

namespace LunchPollServer.DataTransfer
{
    public interface IPage<out T> 
    {
        IEnumerable<T> Values { get; }
        bool HasMore { get; }
    }
}