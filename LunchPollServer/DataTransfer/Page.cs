using System.Collections;
using System.Collections.Generic;

namespace LunchPollServer.DataTransfer
{
    public class Page<T> : IPage<T>
    {
        public Page(IEnumerable<T> values, bool hasMore)
        {
            Values = values;
            HasMore = hasMore;
        }

        public IEnumerable<T> Values { get; }
        public bool HasMore { get; }
    }
}